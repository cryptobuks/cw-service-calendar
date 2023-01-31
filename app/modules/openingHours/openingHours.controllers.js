const { GYM, superUser } = require('./openingHours.enum')

const { db, rabbitmq } = require('@cowellness/cw-micro-service')()
const allowedUser = ['DI', 'OP']

// function setDateTimeToMin (d) {
//   d.setHours(0)
//   d.setMinutes(0)
//   d.setSeconds(0)
//   d.setMilliseconds(0)
//   return d
// }

// function setDateTimeToMax (d) {
//   d.setHours(23)
//   d.setMinutes(59)
//   d.setSeconds(59)
//   d.setMilliseconds(999)
//   return d
// }

/**
 * @class OpeninghoursController
 * @classdesc Controller Openinghours
 */
class OpeninghoursController {
  constructor () {
    this.openingHours = db.calendar.model('weekdayHours')
  }

  async modulePermission (gymId, userId) {
    let userRole = await rabbitmq.sendAndRead('/auth/relation/business/user/role', { businessId: gymId, profileId: userId })
    userRole = userRole.data
    let user = await rabbitmq.sendAndRead('/auth/company/profile/detail', { profileId: gymId, fields: 'typeCode' })
    user = user.data

    if ((userRole && userRole.length) || superUser.includes(user.typeCode)) {
      if (!superUser.includes(user.typeCode)) {
        let isValid = false
        allowedUser.forEach((role) => {
          if (!isValid) {
            isValid = userRole.includes(role)
          }
        })
        if (!isValid) throw new Error('User does not enought permission')
      }
    } else {
      throw new Error('Role not available')
    }
  }

  /**
   *  Should fetch all the exception and weekday data for give GymId
   */
  async getGymWeekDaysAndException (gymId) {
    const weekdays = await this.openingHours.findOne({ gymId }).lean().exec()
    return weekdays
  }

  /**
   *  Should Add / Update weekday and exception data for given GYMid, Method will expect all the data in call to be handled
   */
  async setGymWeekDaysAndException (data, userId) {
    let weekDay

    let isGym = await rabbitmq.sendAndRead('/auth/company/profile/detail', { profileId: data.gymId, fields: 'typeCode' })
    isGym = isGym.data
    if (!GYM.includes(isGym.typeCode)) throw new Error('Not a valid GYM')
    let isNew = false
    weekDay = await this.openingHours.findOne({ gymId: data.gymId }).exec()
    // await this.modulePermission(data.gymId, userId)

    if (!weekDay) {
      isNew = true
      weekDay = {
        gymId: data.gymId,
        createdByProfileId: userId,
        weekdays: [],
        exceptions: []
      }
    } else {
      weekDay.weekdays = []
      weekDay.exceptions = []
    }

    if (data.weekdays && data.weekdays.length) {
      data.weekdays.forEach((e) => {
        const item = { day: e.day }
        item.time = []
        if (e.time && e.time.length) {
          e.time.forEach((t) => {
            const { from, to } = t
            item.time.push({ from, to })
          })
        }
        weekDay.weekdays.push(item)
      })
    }
    if (data.exceptions && data.exceptions.length > 0) {
      data.exceptions.forEach((exc) => {
        const exception = {
          isClosed: exc.isClosed,
          from: exc.from,
          to: exc.to,
          time: []
        }

        if (exc.time && exc.time.length) {
          exc.time.forEach((d) => {
            const { from, to } = d
            exception.time.push({ from, to })
          })
        }
        weekDay.exceptions.push(exception)
      })
    }
    let weekDaysaved
    if (isNew) {
      weekDaysaved = await this.openingHours.create(weekDay)
    } else {
      weekDaysaved = await weekDay.save()
    }
    return weekDaysaved
  }
}

module.exports = OpeninghoursController
