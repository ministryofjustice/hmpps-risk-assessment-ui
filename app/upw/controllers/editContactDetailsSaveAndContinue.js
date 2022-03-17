const upwSaveAndContinue = require('./saveAndContinue')
const { customValidationsEditContactDetails } = require('../fields')

class SaveAndContinue extends upwSaveAndContinue {
  async validateFields(req, res, next) {
    // getting the value of the fields we are interested in
    const { contact_phone_number = '', contact_mobile_number = '' } = req.form.values

    req.form.options.fields = customValidationsEditContactDetails(
      req.form.options.fields,
      contact_phone_number,
      contact_mobile_number,
    )

    super.validateFields(req, res, next)
  }
}

module.exports = SaveAndContinue
