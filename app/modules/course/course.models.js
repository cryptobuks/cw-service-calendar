const { db, ctr } = require('@cowellness/cw-micro-service')()
const lessonSchema = require('./subschema/lesson.subschema')
const Schema = db.calendar.Schema

const schema = new Schema(
  {
    ownerId: Schema.Types.ObjectId,
    status: {
      type: String,
      enum: ['draft', 'active'],
      default: 'draft'
    },
    name: String,
    description: String,
    color: String,
    sports: {
      type: [Schema.Types.ObjectId]
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
    activityId: String,
    age: {
      min: {
        type: Number
      },
      max: {
        type: Number
      }
    },
    inPresence: {
      price: Number,
      singleBuy: {
        type: Boolean,
        default: false
      }
    },
    inRemote: {
      price: Number,
      singleBuy: {
        type: Boolean,
        default: false
      }
    },
    singleBuyDate: {
      start: Date,
      end: Date
    },
    intensity: Number,
    vatRateId: String,
    weightOfZeroVat: String,
    date: {
      start: Date,
      end: Date
    },
    chatGroup: String,
    kcal: Number,
    reporting: Boolean,
    lessons: [lessonSchema],
    note: String,
    isPublic: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  },
  { timestamps: true }
)
schema.post('save', doc => {
  ctr.course.updateESIndex(doc)
})
module.exports = db.calendar.model('Course', schema)
