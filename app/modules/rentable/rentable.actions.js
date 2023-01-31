const { ctr } = require('@cowellness/cw-micro-service')()

class openingHoursActions {
  async getRentables (data, reply) {
    try {
      const rentables = await ctr.rentable.getRentables(data)
      reply.cwSendSuccess({
        data: {
          rentables
        },
        message: 'reply.rentable.success'
      })
    } catch (e) {
      reply.cwSendFail({
        message: 'reply.rentable.error',
        data: e
      })
    }
  }

  async createRentable (data, reply) {
    try {
      const rentable = await ctr.rentable.createRentable(data)
      reply.cwSendSuccess({
        data: {
          rentable
        },
        message: 'reply.rentable.success'
      })
    } catch (e) {
      reply.cwSendFail({
        message: 'reply.rentable.error',
        data: e
      })
    }
  }

  async updateRentable (data, reply) {
    try {
      const rentable = await ctr.rentable.updateRentable(data)
      reply.cwSendSuccess({
        data: {
          rentable
        },
        message: 'reply.rentable.success'
      })
    } catch (e) {
      reply.cwSendFail({
        message: 'reply.rentable.error',
        data: e
      })
    }
  }

  async deleteRentable (data, reply) {
    try {
      const deleted = await ctr.rentable.deleteRentable(data)
      reply.cwSendSuccess({
        data: {
          deleted: !!deleted
        },
        message: 'reply.rentable.success'
      })
    } catch (e) {
      reply.cwSendFail({
        message: 'reply.rentable.error',
        data: e
      })
    }
  }
}

module.exports = openingHoursActions
