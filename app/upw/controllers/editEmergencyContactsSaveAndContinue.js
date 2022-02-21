const upwSaveAndContinue = require('./saveAndContinue')
const { answerDtoFrom } = require('../../common/controllers/saveAndContinue.utils')

class SaveAndContinue extends upwSaveAndContinue {
  async locals(req, res, next) {
    const contactToEdit = req.params[0]
    if (contactToEdit !== 'new') {
      res.locals.pageTitle = 'Edit emergency contact'
      res.locals.editMultiple = 'emergency_contacts'
      res.locals.multipleToEdit = contactToEdit
    } else {
      res.locals.pageTitle = 'Add emergency contact'
    }

    console.log(`going to edit number ${contactToEdit}`)
    const answers = req.sessionModel.get('answers') || req.sessionModel.get('rawAnswers')
    await super.locals(req, res, next)
  }

  async saveValues(req, res, next) {
    const contactToEdit = req.params[0]
    if (contactToEdit !== 'new') {
      res.locals.editMultiple = 'emergency_contacts'
      res.locals.multipleUpdated = contactToEdit
    } else {
      res.locals.addNewMultiple = 'emergency_contacts'
    }

    await super.saveValues(req, res, next)
  }
}

module.exports = SaveAndContinue
