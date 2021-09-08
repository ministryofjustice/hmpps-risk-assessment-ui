module.exports = {
  age_first_conviction: {
    validate: [
      {
        type: 'required',
        message: 'this is a age_first_conviction message',
      },
    ],
  },
  completed_interview: {
    validate: [
      {
        type: 'required',
        message: 'this is a completed_interview message',
        headerMessage: 'this is a completed_interview headerMessage',
      },
    ],
  },
}
