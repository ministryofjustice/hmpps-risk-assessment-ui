const { getUserProfile } = require('../../common/data/offenderAssessmentApi')
const redis = require('../../common/data/redis')
const User = require('../../common/models/user')
const { REFRESH_TOKEN_LIFETIME_SECONDS } = require('../../common/utils/constants')

const {
  dev: { devAssessmentId },
} = require('../../common/config')

const startController = async (req, res) => {
  const { user } = req
  if (user && (user.areaCode === undefined || user.areaCode === null)) {
    const { regions } = await getUserProfile(user.oasysUserCode, user.token)
    if (regions.length === 1) {
      const serializedDetails = await redis.get(`user:${user.id}`)
      const userDetails = new User()
        .withDetails(JSON.parse(serializedDetails))
        .setArea({ areaCode: regions[0].code, areaName: regions[0].name })
      await redis.set(`user:${user.id}`, JSON.stringify(userDetails), 'EX', REFRESH_TOKEN_LIFETIME_SECONDS)
    } else {
      req.flash('regions', JSON.stringify(regions))
      return res.redirect(`/area-selection-page`)
    }
  }
  return res.render(`${__dirname}/index`, { assessmentId: devAssessmentId })
}

module.exports = { startController }
