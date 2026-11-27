const { jwtDecode } = require('jwt-decode')
const { getCachedUserDetails, cacheUserDetails } = require('./userDetailsCache')
const redis = require('./redis')
const authUser = require('../middleware/testSupportFiles/user_token.json')

jest.mock('../data/redis', () => ({
  get: jest.fn(),
  set: jest.fn(),
}))

describe('Auth', () => {
  beforeEach(() => {
    redis.get.mockReset()
    redis.set.mockReset()
  })
  describe('cache user details', () => {
    it('adds the standalone user details to redis cache', async () => {
      const user = jwtDecode(authUser.token)

      await cacheUserDetails(user)
      // Persist user details to Redis and key by the user's ID
      expect(redis.set).toHaveBeenCalledWith('user:1', '{"username":"ITAG_USER","userUuid":null}', 'EX', 43200)
    })

    it('includes the user uuid from the HMPPS Auth token', async () => {
      const userDetails = await cacheUserDetails({
        user_id: '1',
        user_name: 'ITAG_USER',
        name: 'Itag User',
        user_uuid: '11111111-1111-1111-1111-111111111111',
      })

      expect(userDetails.userUuid).toEqual('11111111-1111-1111-1111-111111111111')
      expect(redis.set).toHaveBeenCalledWith(
        'user:1',
        '{"username":"ITAG_USER","name":"Itag User","userUuid":"11111111-1111-1111-1111-111111111111"}',
        'EX',
        43200,
      )
    })

    it('get the user details from redis cache', async () => {
      redis.get.mockResolvedValue('{"username":"RAY_ARNOLD", "name":"Ray Arnold"}')

      const cachedDetails = await getCachedUserDetails(1)

      expect(redis.get).toHaveBeenCalledWith('user:1')
      const userDetails = {
        name: 'Ray Arnold',
        username: 'RAY_ARNOLD',
      }
      expect(cachedDetails).toStrictEqual(userDetails)
    })
  })
})
