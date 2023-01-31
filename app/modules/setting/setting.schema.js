module.exports = {
  getSettings: {
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object'
      }
    }
  },
  getDefaultSettings: {
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object'
      }
    }
  },
  setSettings: {
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object',
        required: ['id', 'options'],
        properties: {
          id: {
            type: 'string',
            typeof: 'ObjectId'
          },
          options: {
            type: 'object',
            properties: {
              calendarVisibility: {
                type: 'object',
                properties: {
                  daysBefore: {
                    type: 'number'
                  },
                  daysAfter: {
                    type: 'number'
                  }
                }
              },
              bookingRules: {
                type: 'object',
                properties: {
                  startTime: {
                    type: 'number'
                  },
                  endTime: {
                    type: 'number'
                  },
                  unBookingTime: {
                    type: 'number'
                  },
                  violationsPeriod: {
                    type: 'number'
                  },
                  numberOfViolations: {
                    type: 'number'
                  },
                  penaltyPeriod: {
                    type: 'number'
                  }
                }
              },
              trackPresence: {
                type: 'object',
                properties: {
                  startTime: {
                    type: 'number'
                  },
                  userEndTime: {
                    type: 'number'
                  },
                  trainerEndTime: {
                    type: 'number'
                  }
                }
              },
              trainerSubstitution: {
                type: 'object',
                properties: {
                  endTime: {
                    type: 'number'
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
