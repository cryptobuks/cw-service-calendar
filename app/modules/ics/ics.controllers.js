const { db, es, envPrefix, _, dayjs } = require('@cowellness/cw-micro-service')()
const ics = require('ics')
/**
 * @class IcsController
 * @classdesc Controller Ics
 */
class IcsController {
  constructor () {
    this.Calendar = db.calendar.model('Calendar')
  }

  async getCalendarEvents (profileId) {
    const startDate = dayjs().subtract(30, 'days').format('YYYY-MM-DDT00:00:00.000Z')
    const endDate = dayjs().add(30, 'days').format('YYYY-MM-DDT00:00:00.000Z')

    const calendars = await this.Calendar.find({
      $or: [
        {
          ownerId: profileId
        },
        {
          'guests.profileId': profileId
        },
        {
          'bookings.profileId': profileId
        }
      ],
      'datetime.start': {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).populate('courseId').populate('appointmentId')

    const events = calendars.map(cal => {
      const startsAt = dayjs(cal.datetime.start).format('YYYY-MM-DD-HH-mm-ss').split('-')
      const endsAt = dayjs(cal.datetime.end).format('YYYY-MM-DD-HH-mm-ss').split('-')
      const title = cal.courseId ? cal.courseId.name : cal.appointmentId.name

      return {
        title,
        start: startsAt,
        end: endsAt
      }
    })
    return ics.createEvents(events)
  }

  async findProfileByToken (token) {
    const result = await es.search({
      index: envPrefix + 'profiles',
      body: {
        size: 1,
        query: {
          bool: {
            must: [
              {
                match: {
                  'settings.calendar.token': token
                }
              }
            ]
          }
        }
      }
    })
    const profile = _.first(_.get(result, 'hits.hits', []))

    if (!profile) {
      return null
    }
    return profile
  }
}

module.exports = IcsController
