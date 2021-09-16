const {
  dateIsAfter,
  yearsBetween,
  range,
  notInFuture,
  validDate,
} = require('../../common/middleware/form-wizard-validators/validators')

const customValidations = (fields, offenderDob, dateFirstSanction, totalSanctions) => {
  fields.date_first_sanction.validate.push({
    fn: dateIsAfter,
    arguments: [offenderDob],
    message: 'Date must be later than the individual’s date of birth',
  })
  fields.date_first_sanction.validate.push({
    fn: yearsBetween,
    arguments: [offenderDob, 8],
    message: 'The individual must be aged 8 or older on the date of first sanction',
  })
  fields.total_violent_offences.validate.push({
    fn: range,
    arguments: [0, totalSanctions],
    message: 'Cannot be greater than the total number of sanctions for all offences',
  })
  fields.date_current_conviction.validate.push({
    fn: dateIsAfter,
    arguments: [offenderDob],
    message: 'Date must be later than the individual’s date of birth',
  })
  fields.date_current_conviction.validate.push({
    fn: dateIsAfter,
    arguments: [dateFirstSanction],
    message: 'Current conviction cannot be before the date of first conviction',
  })
  fields.most_recent_sexual_offence_date.validate.push({
    fn: dateIsAfter,
    arguments: [offenderDob],
    message: 'Date must be later than the individual’s date of birth',
  })
  fields.earliest_release_date.validate.push({
    fn: dateIsAfter,
    arguments: [offenderDob],
    message: 'Date must be later than the individual’s date of birth',
  })
  fields.earliest_release_date.validate.push({
    fn: yearsBetween,
    arguments: [offenderDob, 110],
    message: 'The individual must be aged 110 or younger on commencement',
  })
  return fields
}

const fields = {
  date_first_sanction: {
    validate: [
      {
        fn: validDate,
        message: 'Enter a valid date',
      },
      {
        fn: notInFuture,
        message: 'Date cannot be in the future',
      },
    ],
  },
  total_sanctions: {
    type: 'number',
    validate: [
      {
        fn: range,
        arguments: [1, 999],
        message: 'Enter a number between 1 and 999',
      },
    ],
  },
  total_violent_offences: {
    validate: [],
    type: 'number',
  },
  date_current_conviction: {
    validate: [
      {
        fn: validDate,
        message: 'Enter a valid date',
      },
      {
        fn: notInFuture,
        message: 'Date cannot be in the future',
      },
    ],
  },
  any_sexual_offences: {
    validate: [
      {
        type: 'required',
        message: 'Select an option',
      },
    ],
  },
  most_recent_sexual_offence_date: {
    validate: [
      {
        fn: validDate,
        message: 'Enter a valid date',
      },
      {
        fn: notInFuture,
        message: 'Date cannot be in the future',
      },
    ],
  },
  total_sexual_offences_adult: {
    validate: [
      {
        fn: range,
        arguments: [0, 99],
        message: 'Enter a number',
      },
    ],
  },
  total_sexual_offences_child: {
    validate: [
      {
        fn: range,
        arguments: [0, 99],
        message: 'Enter a number',
      },
    ],
  },
  total_sexual_offences_child_image: {
    validate: [
      {
        fn: range,
        arguments: [0, 99],
        message: 'Enter a number',
      },
    ],
  },
  total_non_contact_sexual_offences: {
    validate: [
      {
        fn: range,
        arguments: [0, 99],
        message: 'Enter a number',
      },
    ],
  },
  earliest_release_date: {
    validate: [
      {
        fn: validDate,
        message: 'Enter a valid date',
      },
    ],
  },
  age_first_conviction: {
    validate: [
      {
        type: 'required',
        message: 'Enter a number',
      },
    ],
  },
  completed_interview: {
    validate: [
      {
        type: 'required',
        message: 'Select an option',
      },
    ],
  },
}

module.exports = { fields, customValidations }
