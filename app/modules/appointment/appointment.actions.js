const { ctr } = require('@cowellness/cw-micro-service')()

/**
 * @class AppointmentActions
 * @classdesc Actions Appointment
 */
class AppointmentActions {
  async createAppointment (data, reply) {
    const appointment = await ctr.appointment.createAppointment(data)

    return reply.cwSendSuccess({
      data: {
        appointment
      }
    })
  }

  async updateAppointment (data, reply) {
    const appointment = await ctr.appointment.updateAppointment(data)

    return reply.cwSendSuccess({
      data: {
        appointment
      }
    })
  }

  async deleteAppointment (data, reply) {
    const deleted = await ctr.appointment.deleteAppointment(data)

    return reply.cwSendSuccess({
      data: {
        deleted
      }
    })
  }

  async getAppointments (data, reply) {
    const appointments = await ctr.appointment.getAppointments(data)

    return reply.cwSendSuccess({
      data: {
        appointments
      }
    })
  }

  async getAppointment (data, reply) {
    const appointment = await ctr.appointment.getAppointment(data)

    return reply.cwSendSuccess({
      data: {
        appointment
      }
    })
  }
}

module.exports = AppointmentActions
