const logger = require('../../common/logging/logger')
const redis = require('../../common/data/redis')
const User = require('../../common/models/user')
const { REFRESH_TOKEN_LIFETIME_SECONDS } = require('../../common/utils/constants')

const {
  dev: { devAssessmentId },
} = require('../../common/config')

const redirectToAssessmentList = async (req, res) => {
  try {
    const { user } = req
    const areaInfo = JSON.parse(req.body.area)
    logger.info(`Area Info: ${areaInfo}`)
    const serializedDetails = await redis.get(`user:${user.id}`)
    const userDetails = new User()
      .withDetails(JSON.parse(serializedDetails))
      .setArea({ areaCode: areaInfo.areaCode, areaName: areaInfo.areaName })
    await redis.set(`user:${user.id}`, JSON.stringify(userDetails), 'EX', REFRESH_TOKEN_LIFETIME_SECONDS)
    return res.redirect(`/${devAssessmentId}/assessments`)
  } catch (error) {
    return res.render('app/error', { error })
  }
}

module.exports = {
  redirectToAssessmentList,
}
