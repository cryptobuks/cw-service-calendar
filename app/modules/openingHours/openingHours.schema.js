const { weekday } = require('./openingHours.enum')

const getGymWeekDaysAndException = {
  schema: {
    tags: ['openingHours', 'gym', 'weekdays'],
    summary: 'Get weekdays for GYM',
    security: [
      {
        authorization: []
      }
    ],
    body: {
      type: 'object',
      required: ['gymId'],
      properties: {
        gymId: {
          description: 'gymId of which weekdays information needs to be returned',
          type: 'string'
        }
      }
    }
  }
}

const setGymWeekDaysAndException = {
  schema: {
    tags: ['openingHours', 'weekdays', 'create'],
    summary: 'Create weekdays for GYM',
    security: [
      {
        authorization: []
      }
    ],
    body: {
      type: 'object',
      required: ['gymId'],
      properties: {
        gymId: {
          description: 'gymId of which weekdays information needs to be created',
          type: 'string'
        },
        exceptions: {
          type: 'array',
          items: {
            type: 'object',
            required: ['from', 'to', 'isClosed'],
            properties: {
              isClosed: {
                type: 'boolean'
              },
              from: {
                type: 'number',
                description: 'YYYYMMDD from Date from which exception should be applied',
                minLength: 8,
                maxLength: 8
              },
              to: {
                type: 'number',
                description: 'YYYYMMDD To date till which exception should be applied',
                minLength: 8,
                maxLength: 8
              },
              time: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['from', 'to'],
                  properties: {
                    from: {
                      type: 'string',
                      description: 'time in HH:mm format',
                      pattern: '^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$'
                    },
                    to: {
                      type: 'string',
                      description: 'time in HH:mm format',
                      pattern: '^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$'
                    }
                  }
                }
              }
            }
          }
        },
        weekdays: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            required: ['day', 'time'],
            properties: {
              day: {
                type: 'string',
                enum: weekday,
                description: 'Week name as descripted in weekdays'
              },
              time: {
                type: 'array',
                minItems: 1,
                items: {
                  type: 'object',
                  required: ['from', 'to'],
                  properties: {
                    from: {
                      type: 'string',
                      description: 'time in HH:mm format',
                      pattern: '^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$'
                    },
                    to: {
                      type: 'string',
                      description: 'time in HH:mm format',
                      pattern: '^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

module.exports = {
  getGymWeekDaysAndException,
  setGymWeekDaysAndException
}
