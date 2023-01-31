const path = require('path')
const basepath = path.join(__dirname, '..', 'app')

module.exports = {
  service: 'calendar',
  fastify: { active: true, port: 3010, prefix: '/api/calendar', sessionSecret: 'cw-micro-service-fastify-session-secret' },
  rabbitmq: { active: true, server: 'localhost:15672', user: 'dev', password: 'dev123' },
  redis: { active: false, server: 'localhost', port: 16379 },
  swagger: { active: true, exposeRoute: true },
  elasticSearch: { active: true, server: 'localhost:9200', timeout: 0, version: '7.6' },
  logger: { level: 'debug' },
  options: {

  },
  basepath,
  mongodb: {
    active: true,
    server: 'localhost',
    port: '',
    user: '',
    password: '',
    debug: true,
    databases: [
      {
        name: 'calendar',
        db: 'calendar',
        options: {}
      }
    ]
  }
}
