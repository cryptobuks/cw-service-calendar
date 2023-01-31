const { db } = require('@cowellness/cw-micro-service')()
const constants = require('./rentable.constants')
const Schema = db.calendar.Schema

const newSchema = new Schema(
  {
    ownerId: {
      type: String
    },
    status: {
      type: String,
      enum: ['draft', 'active']
    },
    name: {
      type: String
    },
    icon: String,
    activityId: String,
    age: {
      min: Number,
      max: Number
    },
    durationMin: Number,
    rentalStart: {
      type: Number,
      enum: constants.rentalStart
    },
    assets: [{
      assetId: String,
      capacity: Number
    }],
    customOpeningTime: Array,
    exceptionOpeningTime: Array,
    isFullRent: Boolean,
    sports: [String],
    price: {
      fix: Number,
      person: Number
    },
    vatRateId: String,
    weightOfZeroVat: String,
    isPublic: Boolean,
    note: String,
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date
    }
  },
  { timestamps: true }
)

module.exports = db.calendar.model('Rentable', newSchema)
