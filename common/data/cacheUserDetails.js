const redis = require('./redis')
const { REFRESH_TOKEN_LIFETIME_SECONDS } = require('../utils/constants')

const cacheUserDetails = async (userId, oasysUser) => {
  const userDetails = {
    isActive: oasysUser?.accountStatus === 'ACTIVE',
    email: oasysUser?.email,
    oasysUserCode: oasysUser?.oasysUserCode,
    username: `${oasysUser?.userForename1} ${oasysUser?.userFamilyName}`,
  }

  await redis.set(`user:${userId}`, JSON.stringify(userDetails), 'EX', REFRESH_TOKEN_LIFETIME_SECONDS)

  return userDetails
}

const getCachedUserDetails = async userId => {
  const serializedDetails = await redis.get(`user:${userId}`)
  return serializedDetails
}

module.exports = {
  cacheUserDetails,
  getCachedUserDetails,
}
