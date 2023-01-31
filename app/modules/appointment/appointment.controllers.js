const { db, ctr } = require('@cowellness/cw-micro-service')()

/**
 * @class AppointmentController
 * @classdesc Controller Appointment
 */
class AppointmentController {
  constructor () {
    this.Appointment = db.calendar.model('Appointment')
  }

  async createAppointment ({ _user, visibility, name, roomId, datetime, guests, repeat, note, sell, reporting }) {
    const ownerId = _user.profileId
    const managerId = _user.managerId || null
    const appointment = await this.Appointment.create({
      ownerId,
      managerId,
      visibility,
      name,
      roomId,
      datetime,
      guests,
      note,
      sell,
      reporting,
      repeat
    })
    await ctr.calendar.updateCalendar('appointment', appointment)
    return appointment
  }

  async updateAppointment ({ _user, appointmentId, visibility, name, roomId, datetime, guests, repeat, note, sell, reporting }) {
    const appointment = await this.Appointment.findOne({
      ownerId: _user.profileId,
      _id: appointmentId
    })

    if (!appointmentId) {
      return null
    }
    appointment.set({
      visibility,
      name,
      roomId,
      datetime,
      guests,
      note,
      sell,
      repeat,
      reporting
    })
    await ctr.calendar.updateCalendar('appointment', appointment)
    return appointment.save()
  }

  async deleteAppointment ({ _user, appointmentId }) {
    const appointment = await this.Appointment.findOne({
      ownerId: _user.profileId,
      _id: appointmentId
    })

    if (appointment) {
      appointment.isDeleted = true
      appointment.deletedAt = Date.now()
      await appointment.save()
      await ctr.calendar.updateCalendar('appointment', appointment)
      return true
    }
    return false
  }

  getAppointments ({ _user }) {
    return this.Appointment.find({
      ownerId: _user.profileId,
      isDeleted: false
    })
  }

  getAppointment ({ _user, appointmentId }) {
    return this.Appointment.find({
      _id: appointmentId,
      ownerId: _user.profileId
    })
  }
}

module.exports = AppointmentController
