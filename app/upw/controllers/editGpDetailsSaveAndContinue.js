const upwSaveAndContinue = require('./saveAndContinue')
const { customValidationsEditGpDetails } = require('../fields')

class SaveAndContinue extends upwSaveAndContinue {
  async locals(req, res, next) {
    const contactToEdit = req.params[0]
    res.locals.editMultiple = 'gp_details'
    if (contactToEdit !== 'new') {
      res.locals.pageTitle = 'Edit GP details'
      res.locals.multipleToEdit = contactToEdit
    } else {
      res.locals.addingNewMultiple = true
      res.locals.pageTitle = 'Add GP details'
    }
    await super.locals(req, res, next)
  }

  async validateFields(req, res, next) {
    // at this point make changes to sessionModel fields to add in context specific validations
    const { emergency_contact_phone_number = '', emergency_contact_mobile_phone_number = '' } = req.form.values

    req.form.options.fields = customValidationsEditGpDetails(
      req.form.options.fields,
      emergency_contact_phone_number,
      emergency_contact_mobile_phone_number,
    )

    super.validateFields(req, res, next)
  }

  async saveValues(req, res, next) {
    const contactToEdit = req.params[0]
    if (contactToEdit !== 'new') {
      res.locals.editMultiple = 'gp_details'
      res.locals.multipleUpdated = contactToEdit
    } else {
      res.locals.addNewMultiple = 'gp_details'
    }

    await super.saveValues(req, res, next)
  }
}

module.exports = SaveAndContinue
