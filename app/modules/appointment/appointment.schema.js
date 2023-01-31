const createUpdateProperties = {
  visibility: {
    type: 'string',
    enum: ['public', 'private']
  },
  name: {
    type: 'string'
  },
  roomId: {
    type: 'string'
  },
  datetime: {
    type: 'object',
    properties: {
      start: {
        type: 'string'
      },
      end: {
        type: 'string'
      }
    }
  },
  note: {
    type: 'string'
  },
  sell: {
    type: 'object',
    properties: {
      price: {
        type: 'number'
      },
      maxPlace: {
        type: 'number'
      }
    }
  },
  reporting: {
    type: 'boolean'
  },
  guests: {
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: false,
      required: ['profileId'],
      properties: {
        profileId: {
          type: 'string',
          typeof: 'ObjectId'
        }
      }
    }
  },
  repeat: {
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: false,
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
}
module.exports = {
  createAppointment: {
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object',
        required: ['name', 'roomId', 'visibility', 'repeat'],
        properties: {
          ...createUpdateProperties
        }
      }
    }
  },
  updateAppointment: {
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object',
        required: ['name', 'roomId', 'visibility', 'repeat'],
        properties: {
          appointmentId: {
            type: 'string',
            typeof: 'ObjectId'
          },
          ...createUpdateProperties
        }
      }
    }
  },
  deleteAppointment: {
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object',
        required: ['appointmentId'],
        properties: {
          appointmentId: {
            type: 'string',
            typeof: 'ObjectId'
          }
        }
      }
    }
  },
  getAppointments: {
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
  getAppointment: {
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object',
        required: ['appointmentId'],
        properties: {
          appointmentId: {
            type: 'string',
            typeof: 'ObjectId'
          }
        }
      }
    }
  }
}
