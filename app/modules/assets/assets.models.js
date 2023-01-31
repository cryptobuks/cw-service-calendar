const { db } = require('@cowellness/cw-micro-service')()
const { type } = require('./assets.enum')

const Schema = db.calendar.Schema

const newSchema = new Schema({
  businessId: {
    type: Schema.ObjectId
  },
  name: {
    type: String,
    required: true,
    maxlength: 25
  },
  color: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: type
  },
  surface: {
    type: String
  },
  address: {
    type: String
  },
  sanification: {
    type: Number
  },
  capacity: {
    adult: {
      type: Number
    },
    children: {
      type: Number
    }
  },
  description: { type: String, maxlength: 300 },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date }
}, { timestamps: true })

module.exports = db.calendar.model('assets', newSchema)
