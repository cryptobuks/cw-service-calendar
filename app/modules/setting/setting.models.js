const { db } = require('@cowellness/cw-micro-service')()

const Schema = db.calendar.Schema

const newSchema = new Schema(
  {
    ownerId: Schema.Types.ObjectId,
    isDefault: {
      type: Boolean,
      default: false
    },
    options: {
      calendarVisibility: {
        daysBefore: {
          type: Number
        },
        daysAfter: {
          type: Number
        }
      },
      bookingRules: {
        startTime: Number,
        endTime: Number,
        unBookingTime: Number,
        violationsPeriod: Number,
        numberOfViolations: Number,
        penaltyPeriod: Number
      },
      trackPresence: {
        startTime: Number,
        userEndTime: Number,
        trainerEndTime: Number
      },
      trainerSubstitution: {
        endTime: Number
      }
    }
  },
  { timestamps: true }
)

module.exports = db.calendar.model('Setting', newSchema)
