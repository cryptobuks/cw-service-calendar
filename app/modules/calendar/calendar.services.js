const { ctr, rabbitmq } = require('@cowellness/cw-micro-service')()

rabbitmq.consume('/calendar/entrances', ({ data }) => {
  return ctr.calendar.filterCalendar(data)
})

rabbitmq.consume('/calendar/availability', ({ data }) => {
  return ctr.calendar.trainerAvailability(data)
})
