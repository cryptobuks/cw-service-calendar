const { weekday } = require('./openingHours.enum')

const { db } = require('@cowellness/cw-micro-service')()

const Schema = db.calendar.Schema

const newSchema = new Schema(
  {
    createdByProfileId: {
      type: Schema.ObjectId,
      ref: 'Profile'
    },
    gymId: {
      type: Schema.ObjectId,
      ref: 'Profile',
      required: true
    },
    exceptions: [{
      _id: false,
      from: {
        type: String,
        required: true,
        match: [/\d{8}/, 'is not valid date']
      },
      isClosed: {
        type: Boolean,
        default: false
      },
      to: {
        type: String,
        required: true,
        match: [/\d{8}/, 'is not valid date']
      },
      time: [{
        _id: false,
        from: {
          type: String,
          required: true,
          match: [/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/gm, 'time validation does not match']
        },
        to: {
          type: String,
          required: true,
          match: [/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/gm, 'time validation does not match']
        }
      }]
    }],
    weekdays: [{
      _id: false,
      day: {
        type: String,
        required: true,
        enum: weekday
      },
      time: [{
        _id: false,
        from: {
          type: String,
          required: true,
          match: [/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/gm, 'time validation does not match']
        },
        to: {
          type: String,
          required: true,
          match: [/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/gm, 'time validation does not match']
        }
      }]
    }]
  },
  { timestamps: true }
)

module.exports = db.calendar.model('weekdayHours', newSchema)
