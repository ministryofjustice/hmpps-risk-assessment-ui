const { randomUUID } = require('crypto')
const { createNamespace, getNamespace } = require('cls-hooked')
const { clsNamespace } = require('../config')

createNamespace(clsNamespace)

function mdcSetup(req, res, next) {
  const MDC = {
    sessionId: req.sessionID,
    correlationId: randomUUID(),
  }
  const mdcNamespace = getNamespace(clsNamespace)
  mdcNamespace.bindEmitter(req)
  mdcNamespace.bindEmitter(res)
  mdcNamespace.run(() => {
    mdcNamespace.set('MDC', MDC)
    next()
  })
}

function getMdcForHeader() {
  const mdcNamespace = getNamespace(clsNamespace)
  if (!mdcNamespace) {
    return {}
  }
  return mdcNamespace.get('MDC')
}

module.exports = { mdcSetup, getMdcForHeader }
