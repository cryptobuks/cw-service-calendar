const { type } = require('./assets.enum')
const gymAssets = {
  schema: {
    tags: ['device', 'gym', 'assets'],
    summary: 'Get Gym Assets',
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
          description: 'Gym Id for which Assets needs to fetched',
          type: 'string'
        }
      }
    }
  }
}

const createAsset = {
  schema: {
    tags: ['device', 'create', 'assets'],
    summary: 'Create Gym assets',
    security: [
      {
        authorization: []
      }
    ],
    body: {
      type: 'object',
      required: ['gymId', 'name', 'color', 'type', 'capacity'],
      properties: {
        gymId: {
          description: 'Gym Id for which Assets details needs to be updated',
          type: 'string'
        },
        name: {
          description: 'Unique Name for Asset',
          type: 'string',
          maxLength: 25
        },
        color: {
          description: 'Color of Asset Text',
          type: 'string',
          minLength: 1
        },
        type: {
          type: 'string',
          enum: type
        },
        surface: {
          type: 'string'
        },
        address: {
          type: 'string',
          nullable: true
        },
        sanification: {
          type: 'number',
          minimum: 0,
          maximum: 120,
          nullable: true
        },
        capacity: {
          type: 'object',
          required: ['adult', 'children'],
          properties: {
            children: {
              type: 'number'
            },
            adult: {
              type: 'number'
            }
          }
        },
        description: {
          description: 'Note for Asset',
          type: 'string',
          maxLength: 300
        }
      }
    }
  }
}

const updateAsset = {
  schema: {
    tags: ['device', 'update', 'assets'],
    summary: 'Update Gym asset',
    security: [
      {
        authorization: []
      }
    ],
    body: {
      type: 'object',
      required: ['gymId', 'assetId', 'name', 'color', 'type', 'capacity'],
      properties: {
        gymId: {
          description: 'Gym Id for which Assets details needs to be updated',
          type: 'string'
        },
        assetId: {
          description: 'Asset Id for which Assets details needs to update',
          type: 'string'
        },
        name: {
          description: 'Unique Name for Asset',
          type: 'string',
          maxLength: 25
        },
        color: {
          description: 'Color of Asset Text',
          type: 'string',
          minLength: 1
        },
        type: {
          type: 'string',
          enum: type
        },
        surface: {
          type: 'string'
        },
        address: {
          type: 'string'
        },
        sanification: {
          type: 'number',
          minimum: 0,
          maximum: 120
        },
        capacity: {
          type: 'object',
          required: ['adult', 'children'],
          properties: {
            children: {
              type: 'number'
            },
            adult: {
              type: 'number'
            }
          }
        },
        description: {
          description: 'Note for Asset',
          type: 'string',
          maxLength: 300
        },
        isDeleted: {
          description: 'Note for Asset',
          type: 'boolean'
        }
      }
    }
  }
}

module.exports = {
  gymAssets,
  createAsset,
  updateAsset
}
