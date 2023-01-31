const { db } = require('@cowellness/cw-micro-service')()
const Schema = db.calendar.Schema

const schema = new Schema(
  {
    location: [{
      type: {
        type: String,
        enum: ['room', 'address']
      },
      roomId: String,
      address: {
        loc: String,
        lat: {
          type: Number
        },
        lng: {
          type: Number
        },
        placeId: {
          type: String
        }
      },
      capacity: Number
    }],
    time: {
      start: String,
      end: String
    },
    datetime: {
      start: Date,
      end: Date,
      endAfter: Number
    },
    sanitificationTime: Number,
    recurrence: Number,
    period: {
      type: String,
      enum: ['day', 'week']
    },
    dayOfWeek: {
      type: [Number],
      enum: [0, 1, 2, 3, 4, 5, 6]
    },
    trainerIds: [],
    entries: [{
      location: [{
        type: {
          type: String,
          enum: ['room', 'address']
        },
        roomId: String,
        address: {
          loc: String,
          lat: {
            type: Number
          },
          lng: {
            type: Number
          },
          placeId: {
            type: String
          }
        },
        capacity: Number
      }],
      datetime: {
        start: Date,
        end: Date
      },
      trainers: [{
        trainerId: String,
        time: {
          start: String,
          end: String
        }
      }]
    }]
  },
  { timestamps: true }
)

module.exports = schema
