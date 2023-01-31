const { db, ctr, es, envPrefix, log } = require('@cowellness/cw-micro-service')()
const constants = require('./course.constants')
/**
 * @class CourseController
 * @classdesc Controller Course
 */
class CourseController {
  constructor () {
    this.Course = db.calendar.model('Course')
  }

  /**
   * Creates a course
   * @param {*} param0 {status, name, ...}
   * @returns created course
   */
  async createCourse ({ _user, status, name, description, color, sports, guests, activityId, inPresence, inRemote, singleBuyDate, intensity, vatRateId, weightOfZeroVat, age, date, lessons, reporting, chatGroup, isPublic, note }) {
    const course = await this.Course.create({
      ownerId: _user.profileId,
      status,
      name,
      description,
      color,
      sports,
      guests: guests.map(guest => ({ profileId: guest.profileId })),
      activityId,
      inPresence,
      inRemote,
      singleBuyDate,
      intensity,
      vatRateId,
      weightOfZeroVat,
      age,
      date,
      reporting,
      chatGroup,
      note,
      isPublic,
      lessons
    })
    await ctr.calendar.updateCalendar('course', course)
    return course
  }

  /**
   * Update a course
   * @param {*} param0 {courseId, status, name, ...}
   * @returns course
   */
  async updateCourse ({ _user, courseId, status, name, description, color, sports, guests, activityId, inPresence, inRemote, singleBuyDate, intensity, vatRateId, weightOfZeroVat, age, date, lessons, reporting, chatGroup, isPublic, note }) {
    const course = await this.Course.findOne({
      ownerId: _user.profileId,
      _id: courseId
    })

    if (!course) {
      return null
    }
    course.set({
      status,
      name,
      description,
      color,
      sports,
      guests: guests.map(guest => ({ profileId: guest.profileId })),
      activityId,
      inPresence,
      inRemote,
      singleBuyDate,
      intensity,
      vatRateId,
      weightOfZeroVat,
      age,
      date,
      reporting,
      chatGroup,
      note,
      isPublic
    })
    course.lessons = []
    if (lessons && lessons.length) {
      lessons.forEach(lesson => {
        course.lessons.push(lesson)
      })
    }

    await ctr.calendar.updateCalendar('course', course)
    return course.save()
  }

  /**
   * Deletes a course
   * @param {*} param0 {courseId}
   * @returns boolean
   */
  async deleteCourse ({ _user, courseId }) {
    const course = await this.Course.findOne({
      ownerId: _user.profileId,
      _id: courseId
    })

    if (course) {
      course.isDeleted = true
      course.deletedAt = Date.now()
      await course.save()
      await ctr.calendar.updateCalendar('course', course)
      return true
    }
    return false
  }

  /**
   * Lists all courses
   * @returns all courses
   */
  getCourses ({ _user }) {
    return this.Course.find({
      ownerId: _user.profileId,
      isDeleted: false
    })
  }

  /**
   * Get single course item
   * @param {*} param0 {courseId}
   * @returns course
   */
  getCourse ({ _user, courseId }) {
    return this.Course.findOne({
      ownerId: _user.profileId,
      _id: courseId,
      isDeleted: false
    })
  }

  /**
   * Update Es index
   */
  updateESIndex (doc) {
    try {
      const trainerIds = []

      doc.lessons.forEach(lesson => {
        trainerIds.push(...lesson.trainerIds)
      })
      if (!doc.chatGroup) {
        return es.delete({
          index: envPrefix + constants.courseChatGroupIndex,
          id: doc._id.toString()
        })
      }
      return es.index({
        index: envPrefix + constants.courseChatGroupIndex,
        id: doc._id.toString(),
        body: {
          courseId: doc._id.toString(),
          chatGroupId: doc.chatGroup,
          trainerIds
        }
      })
    } catch (error) {
      log.info(error)
    }
  }
}

module.exports = CourseController
