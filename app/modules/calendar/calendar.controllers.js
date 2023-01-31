const { db, dayjs, _, rabbitmq } = require('@cowellness/cw-micro-service')()

/**
 * @class CalendarController
 * @classdesc Controller Calendar
 */
class CalendarController {
  constructor () {
    this.Calendar = db.calendar.model('Calendar')
    this.Course = db.calendar.model('Course')
  }

  getCalendar ({ start, end }) {
    const startDate = dayjs(start).hour('00').minute('00')
    const endDate = dayjs(end).hour('23').minute('59')
    return this.Calendar.find({
      'datetime.start': {
        $gte: startDate
      },
      'datetime.end': {
        $lte: endDate
      }
    }, 'type datetime')
  }

  /**
   * Update / create an event in calendar
   * @param {*} type course | appointment
   * @param {*} data course or appointment data
   */
  async updateCalendar (type, data) {
    if (type === 'course') {
      this.setCourseEvent(data)
    } else
    if (type === 'appointment') {
      this.setAppointmentEvent(data)
    }
  }

  /**
   * sets the course event
   * @param {*} course course data
   */
  async setCourseEvent (course) {
    if (course.isDeleted) {
      await this.Calendar.deleteMany({
        courseId: course._id
      })
      return
    }
    const deleteLessonEvents = []

    course.lessons.forEach(lesson => {
      deleteLessonEvents.push(
        this.Calendar.deleteMany({
          type: 'lesson',
          courseId: course._id,
          lessonId: lesson._id,
          entryId: {
            $nin: lesson.entries.map(item => item._id)
          }
        })
      )
    })
    await Promise.all(deleteLessonEvents)

    const lessonsEvents = []

    course.lessons.forEach(lesson => {
      lesson.entries.forEach(item => {
        lessonsEvents.push(this.updateOrCreateLesson(item, course, lesson))
      })
    })
    await Promise.all(lessonsEvents)
  }

  async updateOrCreateLesson (entry, course, lesson) {
    const calendarLesson = await this.Calendar.findOne({
      type: 'lesson',
      courseId: course._id,
      lessonId: lesson._id,
      entryId: entry._id
    })

    if (calendarLesson) {
      calendarLesson.set({
        location: entry.location,
        datetime: entry.datetime,
        trainers: entry.trainers,
        guests: course.guests
      })
      return calendarLesson.save()
    }
    return this.Calendar.create({
      ownerId: course.ownerId,
      visibility: 'public',
      type: 'lesson',
      courseId: course._id,
      lessonId: lesson._id,
      entryId: entry._id,
      datetime: entry.datetime,
      location: entry.location,
      trainers: entry.trainers,
      guests: course.guests
    })
  }

  /**
   * sets the appointment event
   * @param {*} appointment appointment data
   */
  async setAppointmentEvent (appointment) {
    await this.Calendar.deleteMany({
      type: 'appointment',
      appointmentId: appointment._id,
      datetime: {
        $nin: appointment.repeat.map(date => ({
          start: new Date(date.start),
          end: new Date(date.end)
        }))
      }
    })
    const appointmentEvents = []

    appointment.repeat.forEach(date => {
      appointmentEvents.push(this.updateOrCreateAppointment(date, appointment))
    })
    return Promise.all(appointmentEvents)
  }

  async updateOrCreateAppointment (date, appointment) {
    const calendarAppointment = await this.Calendar.findOne({
      type: 'appointment',
      appointmentId: appointment._id,
      'datetime.start': date.start,
      'datetime.end': date.end
    })

    if (calendarAppointment) {
      calendarAppointment.set({
        visibility: appointment.visibility,
        guests: appointment.guests
      })
      return calendarAppointment.save()
    }
    return this.Calendar.create({
      ownerId: appointment.ownerId,
      type: 'appointment',
      appointmentId: appointment._id,
      'datetime.start': date.start,
      'datetime.end': date.end,
      visibility: appointment.visibility,
      guests: appointment.guests
    })
  }

  async filterCalendar ({ ownerId, profileId, startDate, endDate }) {
    if (!endDate) {
      endDate = dayjs().add(50, 'year')
    }
    const filter = {
      ownerId,
      type: 'lesson',
      'trainers.trainerId': profileId,
      'datetime.start': {
        $gte: startDate,
        $lte: endDate
      },
      'datetime.end': {
        $gte: startDate,
        $lte: endDate
      }
    }

    return this.Calendar.find(filter, 'courseId appointmentId datetime trainers').populate('courseId', 'name').populate('appointmentId', 'name').lean()
  }

  async trainerAvailability ({ profileIds, startAt, endAt }) {
    const startDate = dayjs(startAt).format('YYYY-MM-DD')
    const startTime = dayjs(startAt).format('HH:mm')
    const endDate = dayjs(endAt).format('YYYY-MM-DD')
    const endTime = dayjs(endAt).format('HH:mm')
    const calendar = await this.Calendar.find({
      type: 'lesson',
      'trainers.trainerId': {
        $in: profileIds
      },
      'datetime.start': {
        $lte: startDate
      },
      'datetime.end': {
        $gte: endDate
      }
    })

    return profileIds.filter(profileId => {
      return calendar.find(entry => {
        return entry.trainers && entry.trainers.find(t => {
          return t.trainerId === profileId && this.dateRangeOverlaps(t.time.start, t.time.end, startTime, endTime)
        })
      })
    })
  }

  async substituteTrainers ({ gymId, operator, profileId, entrances }) {
    const calendar = await this.Calendar.find({
      ownerId: gymId,
      _id: entrances.map(item => item.entranceId)
    })
    const updates = calendar.map(item => {
      const entrance = entrances.find(e => e.entranceId === item._id.toString())

      return this.Course.findById(item.courseId).then(course => {
        course.lessons.forEach((lesson, lIndex) => {
          if (_.isEqual(lesson._id, item.lessonId)) {
            lesson.entries.forEach((entry, eIndex) => {
              if (_.isEqual(entry._id, item.entryId)) {
                entry.trainers.forEach((trainer, tIndex) => {
                  if (_.isEqual(trainer.trainerId, profileId)) {
                    if (operator === 'add') {
                      course.lessons[lIndex].entries[eIndex].trainers.push({
                        trainerId: entrance.substituteId,
                        time: trainer.time
                      })
                    } else if (operator === 'replace') {
                      course.lessons[lIndex].entries[eIndex].trainers[tIndex].trainerId = entrance.substituteId
                    }
                  }
                })
              }
            })
          }
        })
        return course.save()
      })
    })
    const updated = await Promise.all(updates)
    return updated
  }

  dateRangeOverlaps (startDateA, endDateA, startDateB, endDateB) {
    if ((endDateA < startDateB) || (startDateA > endDateB)) {
      return null
    }
    var obj = {}
    obj.startDate = startDateA <= startDateB ? startDateB : startDateA
    obj.endDate = endDateA <= endDateB ? endDateA : endDateB

    return obj
  }

  async suggestSubstituteTrainers ({ _user, gymId, operator, entrances, startDate, endDate }) {
    const { data: message } = await rabbitmq.sendAndRead('/settings/messages/get', {
      key: 'chat.message.substitute-request',
      type: 'chat'
    })

    await rabbitmq.sendAndRead('/chat/message/action/create', {
      frontId: `calendar-${Date.now()}`,
      fromProfileId: _user.profileId,
      toProfileId: gymId,
      content: {
        type: 'action',
        text: message,
        contentData: {
          type: 'substitute',
          data: {
            profileId: _user.profileId,
            gymId,
            operator,
            entrances,
            startDate,
            endDate
          }
        },
        actions: [
          {
            label: 'global.thumbup',
            showTo: ['to'],
            frontend: {},
            backend: {}
          },
          {
            label: 'global.thumbdown',
            showTo: ['to'],
            frontend: {},
            backend: {}
          }
        ]
      }
    })
    return {
      profileId: _user.profileId,
      gymId,
      operator,
      entrances,
      startDate,
      endDate
    }
  }
}

module.exports = CalendarController
