const { db } = require('@cowellness/cw-micro-service')()

const Schema = db.calendar.Schema

const newSchema = new Schema(
  {
    ownerId: Schema.Types.ObjectId,
    managerId: Schema.Types.ObjectId,
    visibility: {
      type: String,
      enum: ['public', 'private']
    },
    name: {
      type: String
    },
    roomId: Schema.Types.ObjectId,
    datetime: {
      start: Date,
      end: Date
    },
    guests: [{
      profileId: Schema.Types.ObjectId,
      status: {
        type: String,
        enum: ['accepted', 'invited'],
        default: 'invited'
      },
      date: Date
    }],
    sport: {
      type: [Schema.Types.ObjectId]
    },
    note: String,
    notifications: [Schema.Types.ObjectId],
    repeat: {
      type: [{
        start: Date,
        end: Date
      }]
    },
    sell: {
      price: Number,
      maxPlace: Number
    },
    reporting: Boolean,
    isDeleted: Boolean,
    deletedAt: Date
  },
  { timestamps: true }
)

module.exports = db.calendar.model('Appointment', newSchema)
