const constants = require('./rentable.constants')
const rentableProperties = {
  status: {
    type: 'string',
    enum: ['draft', 'active']
  },
  name: {
    type: 'string'
  },
  icon: {
    type: 'string'
  },
  activityId: {
    type: 'string'
  },
  age: {
    type: 'object',
    properties: {
      min: {
        type: 'number'
      },
      max: {
        type: 'number'
      }
    }
  },
  durationMin: {
    type: 'string'
  },
  rentalStart: {
    type: 'number',
    enum: constants.rentalStart
  },
  assets: {
    type: 'array',
    items: {
      type: 'object',
      required: ['assetId', 'capacity'],
      properties: {
        assetId: {
          type: 'string'
        },
        capacity: {
          type: 'string'
        }
      }
    }
  },
  customOpeningTime: {
    type: 'array'
  },
  exceptionOpeningTime: {
    type: 'array'
  },
  isFullRent: {
    type: 'boolean'
  },
  sports: {
    type: 'array',
    items: {
      type: 'string'
    }
  },
  price: {
    type: 'object',
    required: ['fix', 'person'],
    properties: {
      fix: {
        type: 'number'
      },
      person: {
        type: 'number'
      }
    }
  },
  vatRateId: {
    type: 'string'
  },
  weightOfZeroVat: {
    type: 'string'
  },
  isPublic: {
    type: 'boolean'
  },
  note: {
    type: 'string'
  }
}
module.exports = {
  getRentables: {
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
  createRentable: {
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          ...rentableProperties
        }
      }
    }
  },
  updateRentable: {
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object',
        required: ['rentableId', 'name'],
        properties: {
          ...rentableProperties,
          rentableId: {
            type: 'string'
          }
        }
      }
    }
  },
  deleteRentable: {
    schema: {
      security: [
        {
          authorization: []
        }
      ],
      body: {
        type: 'object',
        required: ['rentableId'],
        properties: {
          rentableId: {
            type: 'string'
          }
        }
      }
    }
  }
}
