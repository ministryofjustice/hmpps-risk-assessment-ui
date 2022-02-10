const upwSaveAndContinue = require('./saveAndContinue')

class SaveAndContinue extends upwSaveAndContinue {
  async locals(req, res, next) {
    res.locals.pageTitle = 'Add emergency contact'
    await super.locals(req, res, next)
  }

  async saveValues(req, res, next) {
    res.addNewMultiple = 'emergency_contacts'

    await super.saveValues(req, res, next)
  }
}

module.exports = SaveAndContinue
