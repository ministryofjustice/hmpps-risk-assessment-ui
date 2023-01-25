const { S3 } = require('../../../common/data/aws')

const downloadUpwPdf = async (req, res) => {
  const { key } = req.params

  if (!key) {
    return res.status(400).send()
  }

  const s3 = new S3()
  const response = await s3.fetch(key)

  if (response.ok) {
    return res
      .status(200)
      .set('Content-Type', 'application/pdf')
      .set('Content-Length', response.body.length)
      .send(response.body)
  }
  return res.status(response.statusCode).send()
}

module.exports = {
  downloadUpwPdf,
}
