const { ctr, log } = require('@cowellness/cw-micro-service')()

/**
 * @class CalendarActions
 * @classdesc Actions Calendar
 */
class CalendarActions {
  async getCalendar (data, reply) {
    const calendar = await ctr.calendar.getCalendar(data)

    return reply.cwSendSuccess({
      data: {
        calendar
      }
    })
  }

  async substituteTrainers (data, reply) {
    const substituted = await ctr.calendar.substituteTrainers(data)

    return reply.cwSendSuccess({
      data: {
        substituted
      }
    })
  }

  async suggestSubstituteTrainers (data, reply) {
    try {
      const suggested = await ctr.calendar.suggestSubstituteTrainers(data)

      return reply.cwSendSuccess({
        data: {
          suggested
        }
      })
    } catch (error) {
      log.error(error)
      return reply.cwSendFail({
        message: error.message
      })
    }
  }
}

module.exports = CalendarActions
