const { ctr } = require('@cowellness/cw-micro-service')()

class ActivityActions {
  async getActivities (data, reply) {
    const activities = await ctr.activity.getActivities(data)

    return reply.cwSendSuccess({
      data: {
        activities
      }
    })
  }

  async createActivity (data, reply) {
    const activity = await ctr.activity.createActivity(data)

    return reply.cwSendSuccess({
      data: {
        activity
      }
    })
  }

  async updateActivity (data, reply) {
    const activity = await ctr.activity.updateActivity(data)

    if (!activity) {
      reply.cwSendFail({
        message: 'reply.activity.not.found'
      })
    }
    return reply.cwSendSuccess({
      data: {
        activity
      }
    })
  }

  async deleteActivity (data, reply) {
    const deleted = await ctr.activity.deleteActivity(data)

    if (!deleted) {
      reply.cwSendFail({
        message: 'reply.activity.not.found'
      })
    }
    return reply.cwSendSuccess({
      data: {
        deleted
      }
    })
  }
}

module.exports = ActivityActions
