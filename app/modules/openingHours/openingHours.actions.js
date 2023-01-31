const { ctr } = require('@cowellness/cw-micro-service')()

class openingHoursActions {
  async getGymWeekDaysAndException (data, reply) {
    try {
      const weekdays = await ctr.openingHours.getGymWeekDaysAndException(data.gymId)
      reply.cwSendSuccess({
        data: weekdays,
        message: 'reply.gym.weekdays.success'
      })
    } catch (e) {
      reply.cwSendFail({
        message: 'reply.gym.weekdays.error',
        data: e
      })
    }
  }

  async setGymWeekDaysAndException (data, reply) {
    try {
      const weekdays = await ctr.openingHours.setGymWeekDaysAndException(data, data._user.profileId)
      reply.cwSendSuccess({
        data: weekdays,
        message: 'reply.create.weekdays.success'
      })
    } catch (e) {
      reply.cwSendFail({
        message: 'reply.create.weekdays.error',
        data: e
      })
    }
  }
}

module.exports = openingHoursActions
