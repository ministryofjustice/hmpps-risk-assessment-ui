const upwSaveAndContinue = require('./saveAndContinue')
const { customValidationsEditEmergencyContact } = require('../fields')

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

    await super.locals(req, res, next)
  }

  async validateFields(req, res, next) {
    // at this point makes changes to sessionModel fields to add in context specific validations
    const answers = req.sessionModel.get('answers') || {}
    const { emergency_contact_phone_number = '', emergency_contact_mobile_number = '' } = answers

    req.form.options.fields = customValidationsEditEmergencyContact(
      req.form.options.fields,
      emergency_contact_phone_number,
      emergency_contact_mobile_number,
    )

    super.validateFields(req, res, next)
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
