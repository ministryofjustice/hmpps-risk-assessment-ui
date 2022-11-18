const { getRegistrationsForCrn, getRoshRiskSummaryForCrn } = require('../../../common/data/hmppsAssessmentApi')
const {
  getRegistrations,
  getRoshRiskSummary,
  isModernSlaveryVictim,
  isModernSlaveryPerpetrator,
  hasBothModernSlaveryFlags,
} = require('./common.utils')

jest.mock('../../../common/data/hmppsAssessmentApi')

const user = { id: 1, token: 'FOO_TOKEN' }

describe('GetRegistrations', () => {
  it('returns MAPPA data', async () => {
    getRegistrationsForCrn.mockResolvedValue({
      status: 200,
      response: {
        mappa: {
          level: 'M1',
          levelDescription: 'MAPPA Level 1',
          category: 'M2',
          categoryDescription: 'MAPPA Cat 2',
          startDate: '2021-10-10',
        },
        flags: [],
      },
    })

    const registrations = await getRegistrations('A123456', user)

    expect(registrations).toEqual({
      flags: [],
      mappa: {
        lastUpdated: '10th October 2021',
        isNominal: false,
        level: 'CAT 2/LEVEL 1',
      },
    })
  })

  it('handles when there is no MAPPA data', async () => {
    getRegistrationsForCrn.mockResolvedValue({
      status: 200,
      response: {
        flags: [],
      },
    })

    const registrations = await getRegistrations('A123456', user)

    expect(registrations).toEqual({
      flags: [],
      mappa: {
        level: null,
        isNominal: null,
        lastUpdated: null,
      },
    })
  })

  it('handles when there is no MAPPA category', async () => {
    getRegistrationsForCrn.mockResolvedValue({
      status: 200,
      response: {
        mappa: {
          level: 'M1',
          levelDescription: 'MAPPA Level 1',
          startDate: '2021-10-10',
        },
        flags: [],
      },
    })

    const registrations = await getRegistrations('A123456', user)

    expect(registrations).toEqual({
      flags: [],
      mappa: {
        level: 'LEVEL 1',
        isNominal: false,
        lastUpdated: '10th October 2021',
      },
    })
  })

  it('handles when there is no MAPPA level', async () => {
    getRegistrationsForCrn.mockResolvedValue({
      status: 200,
      response: {
        mappa: {
          category: 'M2',
          categoryDescription: 'MAPPA Cat 2',
          startDate: '2021-10-10',
        },
        flags: [],
      },
    })

    const registrations = await getRegistrations('A123456', user)

    expect(registrations).toEqual({
      flags: [],
      mappa: {
        level: 'CAT 2',
        isNominal: null,
        lastUpdated: '10th October 2021',
      },
    })
  })

  it('handles when there is no MAPPA startDate', async () => {
    getRegistrationsForCrn.mockResolvedValue({
      status: 200,
      response: {
        mappa: {
          level: 'M1',
          levelDescription: 'MAPPA Level 1',
          category: 'M2',
          categoryDescription: 'MAPPA Cat 2',
        },
        flags: [],
      },
    })

    const registrations = await getRegistrations('A123456', user)

    expect(registrations).toEqual({
      flags: [],
      mappa: {
        level: 'CAT 2/LEVEL 1',
        isNominal: false,
        lastUpdated: null,
      },
    })
  })

  it('returns risk flags', async () => {
    getRegistrationsForCrn.mockResolvedValue({
      status: 200,
      response: {
        flags: [{ code: 'IRMO', description: 'Hate Crime', colour: 'Red' }],
      },
    })

    const registrations = await getRegistrations('A123456', user)

    expect(registrations).toEqual({
      flags: [{ code: 'IRMO', description: 'Hate Crime', colour: 'Red' }],
      mappa: {
        level: null,
        isNominal: null,
        lastUpdated: null,
      },
    })
  })

  it('handles when there are no risk flags', async () => {
    getRegistrationsForCrn.mockResolvedValue({
      status: 200,
      response: {
        flags: [],
      },
    })

    const registrations = await getRegistrations('A123456', user)

    expect(registrations).toEqual({
      flags: [],
      mappa: {
        level: null,
        isNominal: null,
        lastUpdated: null,
      },
    })
  })

  it('flags when the response is 404', async () => {
    getRegistrationsForCrn.mockResolvedValue({
      status: 404,
      ok: false,
      response: {},
    })

    const registrations = await getRegistrations('A123456', user)

    expect(registrations).toEqual({
      flags: [],
      mappa: {},
    })
  })

  it('returns null when there is a failed request', async () => {
    await Promise.all(
      [400, 401, 403, 500, 501, 502, 503, 504].map(async (statusCode) => {
        getRegistrationsForCrn.mockResolvedValue({
          status: statusCode,
          ok: false,
          response: {},
        })

        const registrations = await getRegistrations('A123456', user)

        expect(registrations).toEqual({
          flags: null,
          mappa: null,
        })
      }),
    )
  })
})

describe('GetRegistrations', () => {
  it('returns ROSH risk data', async () => {
    getRoshRiskSummaryForCrn.mockResolvedValue({
      status: 200,
      ok: true,
      response: {
        hasBeenCompleted: true,
        overallRisk: 'HIGH',
        assessedOn: '2021-10-10',
        riskInCommunity: {
          Children: 'LOW',
          Public: 'HIGH',
          'Known Adult': 'MEDIUM',
          Staff: 'HIGH',
        },
      },
    })

    const riskSummary = await getRoshRiskSummary('A123456', user)

    expect(riskSummary).toEqual({
      roshRiskSummary: {
        hasBeenCompleted: true,
        overallRisk: 'HIGH',
        lastUpdated: '10th October 2021',
        riskInCommunity: {
          Children: 'LOW',
          Public: 'HIGH',
          'Known Adult': 'MEDIUM',
          Staff: 'HIGH',
        },
      },
    })
  })

  it('returns null when not known risk', async () => {
    getRoshRiskSummaryForCrn.mockResolvedValue({
      status: 200,
      ok: true,
      response: {
        hasBeenCompleted: true,
        overallRisk: null,
        assessedOn: '2021-10-10',
        riskInCommunity: {
          Children: null,
          Public: null,
          'Known Adult': null,
          Staff: null,
        },
      },
    })

    const riskSummary = await getRoshRiskSummary('A123456', user)

    expect(riskSummary).toEqual({
      roshRiskSummary: {
        hasBeenCompleted: true,
        overallRisk: null,
        lastUpdated: '10th October 2021',
        riskInCommunity: {
          Children: null,
          Public: null,
          'Known Adult': null,
          Staff: null,
        },
      },
    })
  })

  it('returns null when the response has a 4XX or 5XX status', async () => {
    await Promise.all(
      [400, 401, 403, 500, 501, 502, 503, 504].map(async (statusCode) => {
        getRoshRiskSummaryForCrn.mockResolvedValue({
          status: statusCode,
          ok: false,
          response: {},
        })

        const riskSummary = await getRoshRiskSummary('A123456', user)

        expect(riskSummary).toEqual({
          roshRiskSummary: null,
        })
      }),
    )
  })

  it('flags as notBeenCompleted when the response is 404', async () => {
    getRoshRiskSummaryForCrn.mockResolvedValue({
      status: 404,
      ok: false,
      response: {},
    })

    const riskSummary = await getRoshRiskSummary('A123456', user)

    expect(riskSummary).toEqual({
      roshRiskSummary: {
        hasBeenCompleted: false,
      },
    })
  })
})

describe('modernSlaveryFlags ', () => {
  const modernSlaveryPerpetrator = [{ code: 'MSP' }]
  const modernSlaveryVictim = [{ code: 'MSV' }]
  const modernSlaveryPerpetratorAndVictim = [{ code: 'MSV' }, { code: 'MSP' }]
  it('returns true when flags are present', () => {
    expect(isModernSlaveryVictim(modernSlaveryVictim)).toBe(true)
    expect(isModernSlaveryPerpetrator(modernSlaveryPerpetrator)).toBe(true)
    expect(hasBothModernSlaveryFlags(modernSlaveryPerpetratorAndVictim)).toBe(true)
  })

  it('returns false when flags are not present', () => {
    const flags = []

    expect(isModernSlaveryPerpetrator(flags)).toBe(false)
    expect(isModernSlaveryVictim(flags)).toBe(false)
    expect(hasBothModernSlaveryFlags(flags)).toBe(false)
  })

  it('handles when flags are undefined', () => {
    const flags = undefined

    expect(isModernSlaveryPerpetrator(flags)).toBe(false)
    expect(isModernSlaveryVictim(flags)).toBe(false)
    expect(hasBothModernSlaveryFlags(flags)).toBe(false)
  })
})
