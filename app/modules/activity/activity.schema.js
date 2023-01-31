const constants = require('./activity.constants')
const getActivities = {
  schema: {
    summary: 'Get activities',
    security: [
      {
        authorization: []
      }
    ],
    body: {
      type: 'object'
    }
  }
}

const createActivity = {
  schema: {
    summary: 'create activity',
    security: [
      {
        authorization: []
      }
    ],
    body: {
      type: 'object',
      required: ['name', 'assets'],
      properties: {
        name: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        visibility: {
          type: 'string',
          enum: constants.visibility
        },
        assets: {
          type: 'array',
          items: {
            type: 'string',
            typeof: 'ObjectId'
          }
        },
        sports: {
          type: 'array',
          items: {
            type: 'string',
            typeof: 'ObjectId'
          }
        }
      }
    }
  }
}

const updateActivity = {
  schema: {
    summary: 'update activity',
    security: [
      {
        authorization: []
      }
    ],
    body: {
      type: 'object',
      required: ['activityId', 'name', 'assets'],
      properties: {
        activityId: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        visibility: {
          type: 'string',
          enum: constants.visibility
        },
        assets: {
          type: 'array',
          items: {
            type: 'string',
            typeof: 'ObjectId'
          }
        },
        sports: {
          type: 'array',
          items: {
            type: 'string',
            typeof: 'ObjectId'
          }
        }
      }
    }
  }
}

const deleteActivity = {
  schema: {
    summary: 'delete activity',
    security: [
      {
        authorization: []
      }
    ],
    body: {
      type: 'object',
      required: ['activityId'],
      properties: {
        activityId: {
          type: 'string'
        }
      }
    }
  }
}

module.exports = {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity
}
