const { cacheUserDetailsWithRegion } = require('../../common/data/userDetailsCache')

const {
  dev: { devAssessmentId },
} = require('../../common/config')

const redirectToAssessmentList = async (req, res) => {
  try {
    const { user } = req
    const areaInfo = JSON.parse(req.body.area)

    await cacheUserDetailsWithRegion(user.id, areaInfo.areaCode, areaInfo.areaName)

    return res.redirect('cf94d1b1-4a3a-4071-bea4-9c77f742f357/questiongroup/pre_sentence_assessment/summary')
  } catch (error) {
    return res.render('app/error', { error })
  }
}

module.exports = {
  redirectToAssessmentList,
}
