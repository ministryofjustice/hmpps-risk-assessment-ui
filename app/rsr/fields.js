const { range, notInFuture, validDate } = require('../../common/middleware/form-wizard-validators/validators')

module.exports = {
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
