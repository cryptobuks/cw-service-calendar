const { ctr, log } = require('@cowellness/cw-micro-service')()
const validationSchema = require('./ics.schema')

module.exports = async function (fastify, opts, done) {
  fastify.get('/:token/calendar.ics', validationSchema.getCalendarEvents, async (request, reply) => {
    const token = request.params.token
    const profile = await ctr.ics.findProfileByToken(token)
    if (!profile) {
      return reply.code(404).send('NOT_FOUND')
    }
    const { error, value } = await ctr.ics.getCalendarEvents(profile._id)
    if (error) {
      log.error(error)
      return reply.code(404).send('NOT_FOUND')
    }
    reply
      .header('Content-disposition', 'attachment; filename=calendar.ics')
      .type('application/octet-stream')
      .send(value)
  })
}
