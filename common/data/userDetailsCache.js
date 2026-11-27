const redis = require('./redis')
const { REFRESH_TOKEN_LIFETIME_SECONDS } = require('../utils/constants')

const cacheUserDetails = async user => {
  const userDetails = {
    username: user?.user_name,
    name: user?.name,
    // Created by HMPPS Auth on first sign-in and unique across all its auth sources.
    // Stored as null rather than undefined so it survives JSON serialisation and marks the entry as current.
    userUuid: user?.user_uuid ?? null,
  }

  await redis.set(`user:${user?.user_id}`, JSON.stringify(userDetails), 'EX', REFRESH_TOKEN_LIFETIME_SECONDS)

  return userDetails
}

const getCachedUserDetails = async userId => {
  const serializedDetails = await redis.get(`user:${userId}`)
  return serializedDetails !== null ? JSON.parse(serializedDetails) : null
}

module.exports = {
  cacheUserDetails,
  getCachedUserDetails,
}
