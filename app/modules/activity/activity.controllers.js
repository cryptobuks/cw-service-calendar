const { db } = require('@cowellness/cw-micro-service')()

/**
 * @class ActivityController
 * @classdesc Controller Activity
 */
class ActivityController {
  constructor () {
    this.Activity = db.calendar.model('Activity')
  }

  getActivities ({ _user }) {
    return this.Activity.find({
      ownerId: _user.profileId,
      deletedAt: null
    })
  }

  createActivity ({ _user, name, description, visibility, assets, sports }) {
    return this.Activity.create({
      ownerId: _user.profileId,
      name,
      description,
      visibility,
      assets,
      sports
    })
  }

  async updateActivity ({ _user, activityId, name, description, visibility, assets, sports }) {
    const activity = await this.Activity.findOne({
      ownerId: _user.profileId,
      _id: activityId
    })

    if (!activity) {
      return null
    }
    activity.set({
      name,
      description,
      visibility,
      assets,
      sports
    })
    return activity.save()
  }

  async deleteActivity ({ _user, activityId }) {
    const activity = await this.Activity.findOne({
      ownerId: _user.profileId,
      _id: activityId
    })

    if (!activity) {
      return null
    }

    activity.set({
      deletedAt: Date.now()
    })
    await activity.save()
    return true
  }
}

module.exports = ActivityController
