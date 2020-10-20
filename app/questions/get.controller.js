const displayQuestionList = async ({ tokens }, res) => {
  return res.render(`${__dirname}/index`, {})
}

module.exports = { displayQuestionList }
