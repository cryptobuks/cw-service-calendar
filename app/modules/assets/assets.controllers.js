const { db, rabbitmq } = require('@cowellness/cw-micro-service')()
const { GYM } = require('./assets.enum')

/**
 * @class AssetsController
 * @classdesc Controller Assets
 */
class AssetsController {
  constructor () {
    this.Assets = db.calendar.model('assets')
  }

  async gymAssets (gymId, profileId, actualUserId) {
    console.log({
      gymId, profileId, actualUserId
    })
    let relation = await rabbitmq.sendAndRead('/auth/relation/verify', { businessId: gymId, profileId: profileId })
    if (!relation.data) {
      relation = await rabbitmq.sendAndRead('/auth/relation/verify', { businessId: gymId, profileId: actualUserId })
    }
    if (!relation.data) throw new Error('Relationship between the profile does not exist')
    const gymAssets = await rabbitmq.sendAndRead('/auth/company/profile/detail', { profileId: gymId, fields: 'typeCode company.assets' })
    if (!gymAssets.data || !gymAssets.data.company || !GYM.includes(gymAssets.data.typeCode)) throw new Error('Not a valid GYM')
    const assets = await this.Assets.find({ businessId: gymId, isDeleted: false }).lean().exec()
    return assets
  }

  async createAsset (gymId, profileId, name, color, type, surface, address, sanification, capacity, description, actualUserId) {
    let relation = await await rabbitmq.sendAndRead('/auth/relation/verify', { businessId: gymId, profileId: profileId })
    if (!relation.data) {
      relation = await rabbitmq.sendAndRead('/auth/relation/verify', { businessId: gymId, profileId: actualUserId })
    }
    relation = relation.data
    if (!relation) throw new Error('Relationship between the profile does not exist')

    if (!relation.roles || !relation.roles.length) throw new Error('User does not have proper roles for this operation. DI / OP role is required')
    const permission = relation.roles.filter((r) => { return ['temporary', 'active'].includes(r.status) && ['DI', 'OP'].includes(r.role) })
    if (!permission.length) throw new Error('User does not have proper roles for this operation.  DI / OP role is required')

    let gymAssets = await await rabbitmq.sendAndRead('/auth/company/profile/detail', { profileId: gymId, fields: 'typeCode company.assets' })
    gymAssets = gymAssets.data
    if (!gymAssets || !gymAssets.company || !GYM.includes(gymAssets.typeCode)) throw new Error('Not a valid GYM')
    const assets = await this.Assets.find({ businessId: gymId, name: { $regex: new RegExp(name.trim(), 'i') } }, '_id').lean().exec()
    if (assets && assets.length) throw new Error('Asset with same name already present')
    let asset = {
      businessId: gymId,
      name: name.trim(),
      color,
      type,
      surface,
      address,
      sanification,
      capacity: {
        adult: capacity.adult,
        children: capacity.children
      },
      description: description,
      isDeleted: false
    }
    asset = await this.Assets.create(asset)
    return asset
  }

  async updateAsset (gymId, profileId, assetId, name, color, type, surface, address, sanification, capacity, description, isDeleted, actualUserId) {
    let relation = await await rabbitmq.sendAndRead('/auth/relation/verify', { businessId: gymId, profileId: profileId })
    if (!relation.data) {
      relation = await rabbitmq.sendAndRead('/auth/relation/verify', { businessId: gymId, profileId: actualUserId })
    }
    relation = relation.data
    if (!relation) throw new Error('Relationship between the profile does not exist')

    if (!relation.roles || !relation.roles.length) throw new Error('User does not have proper roles for this operation.  DI / OP role is required')
    const permission = relation.roles.filter((r) => { return ['temporary', 'active'].includes(r.status) && ['DI', 'OP'].includes(r.role) })
    if (!permission.length) throw new Error('User does not have proper roles for this operation.  DI / OP role is required')

    let gymAssets = await rabbitmq.sendAndRead('/auth/company/profile/detail', { profileId: gymId, fields: 'typeCode company.assets' })
    gymAssets = gymAssets.data
    const selectedAsset = await this.Assets.findById(assetId).exec()
    if (!selectedAsset) throw new Error('Asset Details not found')
    if (selectedAsset.isDeleted) throw new Error('Asset already deleted')
    if (!gymAssets || !gymAssets.company || !GYM.includes(gymAssets.typeCode)) throw new Error('Not a valid GYM')
    const assets = await this.Assets.find({ _id: { $ne: assetId }, businessId: gymId, name: { $regex: new RegExp(name.trim(), 'i') } }, '_id').lean().exec()
    if (assets && assets.length) throw new Error('Asset with same name already present')
    selectedAsset.name = name
    selectedAsset.color = color
    selectedAsset.type = type
    selectedAsset.surface = surface
    selectedAsset.address = address
    selectedAsset.sanification = sanification
    selectedAsset.capacity = capacity
    selectedAsset.description = description
    selectedAsset.updatedBy = profileId
    if (isDeleted) {
      selectedAsset.isDeleted = isDeleted
      selectedAsset.deletedAt = Date.now()
    }

    await selectedAsset.save()
    return selectedAsset
  }
}

module.exports = AssetsController
