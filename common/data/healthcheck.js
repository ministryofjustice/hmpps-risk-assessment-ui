import superagent from 'superagent'
import Agent, { HttpsAgent } from 'agentkeepalive'
import logger from '../logging/logger'

// eslint-disable-next-line import/prefer-default-export
export const serviceCheckFactory = (name, { url, agent }) => {
  const keepaliveAgent = url.startsWith('https') ? new HttpsAgent(agent) : new Agent(agent)

  return () =>
    new Promise((resolve, reject) => {
      superagent
        .get(`${url}/ping`)
        .agent(keepaliveAgent)
        .retry(2, (err, res) => {
          if (err) logger.info(`Retry handler found API error with ${err.code} ${err.message}`)
          return undefined // retry handler only for logging retries, not to influence retry logic
        })
        .timeout({
          response: 1000,
          deadline: 1500,
        })
        .end((error, result) => {
          logger.info(`${name} ${url}/ping ${result}`)
          if (error) {
            logger.error(error.stack, `Error calling ${name}`)
            reject(error)
          } else if (result.status === 200) {
            resolve('OK')
          } else {
            reject(result.status)
          }
        })
    })
}
