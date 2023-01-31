const { db } = require('@cowellness/cw-micro-service')()
const constants = require('./setting.constants')
/**
 * @class SettingController
 * @classdesc Controller Setting
 */
class SettingController {
  constructor () {
    this.Setting = db.calendar.model('Setting')
  }

  async getSettings ({ _user }) {
    const settings = await this.Setting.findOne({
      ownerId: _user.profileId
    })

    if (!settings) {
      const defaultSettings = await this.getDefaultSettings()

      return this.Setting.create({
        ownerId: _user.profileId,
        isDefault: false,
        options: defaultSettings.options
      })
    }
    return settings
  }

  async getDefaultSettings () {
    const settings = await this.Setting.findOne({
      isDefault: true
    })

    if (!settings) {
      return this.Setting.create({
        isDefault: true,
        options: constants.defaultSettings
      })
    }
    return settings
  }

  async setSettings ({ _user, id, options }) {
    const item = await this.Setting.findOne({
      _id: id,
      ownerId: _user.profileId
    })

    if (!item) {
      return null
    }
    // check role CW, CQ, CH if isDefault

    item.options = options
    return item.save()
  }
}

module.exports = SettingController
