const { getUserProfile } = require('../../common/data/offenderAssessmentApi')
const { cacheUserDetailsWithRegion } = require('../../common/data/userDetailsCache')

const {
  dev: { devAssessmentId },
} = require('../../common/config')
const { getApiToken } = require('../../common/data/oauth')

const startController = async (req, res) => {
  const { user } = req
  if (user && (user.areaCode === undefined || user.areaCode === null)) {
    const apiToken = await getApiToken()
    const { regions } = await getUserProfile(user.oasysUserCode, apiToken)
    if (regions.length === 1) {
      await cacheUserDetailsWithRegion(user.id, regions[0].code, regions[0].name)
    } else {
      req.flash('regions', JSON.stringify(regions))
      return res.redirect(`/area-selection`)
    }
  }
  return res.render(`${__dirname}/index`, { assessmentId: devAssessmentId })
}

module.exports = { startController }
