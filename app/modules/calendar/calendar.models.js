const { db } = require('@cowellness/cw-micro-service')()

const Schema = db.calendar.Schema

const newSchema = new Schema(
  {
    ownerId: Schema.Types.ObjectId,
    type: {
      type: String,
      enum: ['lesson', 'trybuy', 'appointment', 'service']
    },
    visibility: {
      type: String,
      enum: ['public', 'private', 'invisible']
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    lessonId: {
      type: Schema.Types.ObjectId
    },
    entryId: {
      type: Schema.Types.ObjectId
    },
    location: {
      type: [Object]
    },
    trainers: {
      type: [Object]
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment'
    },
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
    bookings: [{
      profileId: Schema.Types.ObjectId,
      createdAt: {
        type: Date,
        default: Date.now()
      }
    }],
    waitList: [{
      profileId: Schema.Types.ObjectId,
      createdAt: {
        type: Date,
        default: Date.now()
      }
    }],
    presences: [{
      profileId: Schema.Types.ObjectId,
      inAt: Date,
      outAt: Date,
      recordedInBy: Schema.Types.ObjectId,
      recordedOutBy: Schema.Types.ObjectId,
      kcal: String
    }]
  },
  { timestamps: true }
)
newSchema.index({ ownerId: 1, 'datetime.start': 1, 'datetime.end': 1 }, { unique: true })
module.exports = db.calendar.model('Calendar', newSchema)
