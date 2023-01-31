module.exports = {
  getCalendar: {
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object',
        required: ['start', 'end'],
        properties: {
          start: {
            type: 'string'
          },
          end: {
            type: 'string'
          }
        }
      }
    }
  },
  substituteTrainers: {
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object',
        required: ['gymId', 'operator', 'profileId', 'entrances'],
        properties: {
          gymId: {
            type: 'string'
          },
          operator: {
            type: 'string',
            enum: ['add', 'replace']
          },
          profileId: {
            type: 'string'
          },
          entrances: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                substituteId: {
                  type: 'string'
                },
                entranceId: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  },
  suggestSubstituteTrainers: {
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object',
        required: ['gymId', 'operator', 'entrances'],
        properties: {
          gymId: {
            type: 'string'
          },
          operator: {
            type: 'string',
            enum: ['add', 'replace']
          },
          entrances: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                substituteId: {
                  type: 'string'
                },
                entranceId: {
                  type: 'string'
                }
              }
            }
          },
          startDate: {
            type: 'string'
          },
          endDate: {
            type: 'string'
          }
        }
      }
    }
  }
}
