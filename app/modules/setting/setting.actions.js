const { ctr } = require('@cowellness/cw-micro-service')()

/**
 * @class SettingActions
 * @classdesc Actions Setting
 */
class SettingActions {
  async getSettings (data, reply) {
    const settings = await ctr.setting.getSettings(data)

    return reply.cwSendSuccess({
      data: {
        settings
      }
    })
  }

  async getDefaultSettings (data, reply) {
    const settings = await ctr.setting.getDefaultSettings(data)

    return reply.cwSendSuccess({
      data: {
        settings
      }
    })
  }

  async setSettings (data, reply) {
    const settings = await ctr.setting.setSettings(data)

    return reply.cwSendSuccess({
      data: {
        settings
      }
    })
  }
}

module.exports = SettingActions
