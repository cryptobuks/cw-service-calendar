const { ctr } = require('@cowellness/cw-micro-service')()

class AssetsActions {
  async gymAssets (data, reply) {
    try {
      const assets = await ctr.assets.gymAssets(data.gymId, data._user.profileId, data._user.id)
      reply.cwSendSuccess({
        data: assets,
        message: 'reply.gym.assets.success'
      })
    } catch (e) {
      reply.cwSendFail({
        message: 'reply.gym.assets.error',
        data: e
      })
    }
  }

  async createAsset (data, reply) {
    try {
      const asset = await ctr.assets.createAsset(data.gymId, data._user.profileId, data.name, data.color, data.type, data.surface, data.address, data.sanification, data.capacity, data.note, data._user.id)
      reply.cwSendSuccess({
        data: asset,
        message: 'reply.asset.create.success'
      })
    } catch (e) {
      reply.cwSendFail({
        message: 'reply.asset.create.error',
        data: e
      })
    }
  }

  async updateAsset (data, reply) {
    try {
      const asset = await ctr.assets.updateAsset(data.gymId, data._user.profileId, data.assetId, data.name, data.color, data.type, data.surface, data.address, data.sanification, data.capacity, data.note, data.isDeleted, data._user.id)
      reply.cwSendSuccess({
        data: asset,
        message: 'reply.asset.update.success'
      })
    } catch (e) {
      reply.cwSendFail({
        message: 'reply.asset.update.error',
        data: e
      })
    }
  }
}

module.exports = AssetsActions
