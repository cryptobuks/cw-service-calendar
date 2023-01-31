const { db } = require('@cowellness/cw-micro-service')()
const constants = require('./activity.constants')
const Schema = db.calendar.Schema

const newSchema = new Schema(
  {
    ownerId: Schema.Types.ObjectId,
    name: {
      type: String
    },
    description: {
      type: String
    },
    visibility: {
      type: String,
      enum: constants.visibility,
      default: 'private'
    },
    assets: {
      type: [Schema.Types.ObjectId]
    },
    sports: {
      type: [Schema.Types.ObjectId]
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
)

module.exports = db.calendar.model('Activity', newSchema)
