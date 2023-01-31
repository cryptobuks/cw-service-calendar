// process.env.NODE_ENV = 'production'
const config = require('config')
config.fastify.port = 0
const cw = require('@cowellness/cw-micro-service')(config)

cw.autoStart().then(async () => {
  const Course = cw.db.calendar.model('Course')
  const courses = await Course.find()
  for (const course of courses) {
    await course.save()
  }
  console.log('done')
  process.exit()
})
