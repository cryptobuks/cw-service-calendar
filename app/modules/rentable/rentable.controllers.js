const { db } = require('@cowellness/cw-micro-service')()

/**
 * @class RentableController
 * @classdesc Controller Rentable
 */
class RentableController {
  constructor () {
    this.Rentable = db.calendar.model('Rentable')
  }

  /**
   * List all rentables
   * @returns list of renables
   */
  getRentables ({ _user }) {
    return this.Rentable.find({
      ownerId: _user.profileId,
      isDeleted: false
    })
  }

  /**
   * Creates a rentable entry
   * @param {*} param0 rentable data
   * @returns rentable data
   */
  createRentable ({ _user, status, name, icon, activityId, age, durationMin, rentalStart, assets, customOpeningTime, exceptionOpeningTime, isFullRent, sports, price, vatRateId, weightOfZeroVat, isPublic, note }) {
    return this.Rentable.create({
      ownerId: _user.profileId,
      status,
      name,
      icon,
      activityId,
      age,
      durationMin,
      rentalStart,
      assets,
      customOpeningTime,
      exceptionOpeningTime,
      isFullRent,
      sports,
      price,
      vatRateId,
      weightOfZeroVat,
      isPublic,
      note
    })
  }

  /**
   * Update rentables
   * @param {*} param0 rentable data
   * @returns rentable data
   */
  async updateRentable ({ _user, rentableId, status, name, icon, activityId, age, durationMin, rentalStart, assets, customOpeningTime, exceptionOpeningTime, isFullRent, sports, price, vatRateId, weightOfZeroVat, isPublic, note }) {
    const rentable = await this.Rentable.findOne({
      ownerId: _user.profileId,
      _id: rentableId
    })
    if (!rentable) {
      return null
    }
    rentable.set({
      status,
      name,
      icon,
      activityId,
      age,
      durationMin,
      rentalStart,
      assets,
      customOpeningTime,
      exceptionOpeningTime,
      isFullRent,
      sports,
      price,
      vatRateId,
      weightOfZeroVat,
      isPublic,
      note
    })
    return rentable.save()
  }

  async deleteRentable ({ _user, rentableId }) {
    const rentable = await this.Rentable.findOne({
      ownerId: _user.profileId,
      _id: rentableId
    })
    if (!rentable) {
      return null
    }
    rentable.set({
      isDeleted: true,
      deletedAt: Date.now()
    })
    return rentable
  }
}

module.exports = RentableController
