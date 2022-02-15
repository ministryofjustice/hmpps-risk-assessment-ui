const upwSaveAndContinue = require('./saveAndContinue')
const { answerDtoFrom } = require('../../common/controllers/saveAndContinue.utils')

class SaveAndContinue extends upwSaveAndContinue {
  async locals(req, res, next) {
    const contactToEdit = req.params[0]
    if (contactToEdit !== 'new') {
      res.locals.pageTitle = 'Edit emergency contact'
    } else {
      res.locals.pageTitle = 'Add emergency contact'
    }

    console.log(`going to edit number ${contactToEdit}`)
    const answers = req.sessionModel.get('answers') || req.sessionModel.get('rawAnswers')

    console.log(JSON.stringify(answers, null, 2))

    res.locals.emergency_contact_first_name = 'test'

    await super.locals(req, res, next)
  }

  async saveValues(req, res, next) {
    res.addNewMultiple = 'emergency_contacts'

    await super.saveValues(req, res, next)
  }
}

module.exports = SaveAndContinue
