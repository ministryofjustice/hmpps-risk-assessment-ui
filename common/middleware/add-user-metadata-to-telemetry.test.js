const { trace } = require('@opentelemetry/api')
const addUserMetadataToTelemetry = require('./add-user-metadata-to-telemetry')

describe('addUserMetadataToTelemetry', () => {
  let span
  let next

  beforeEach(() => {
    span = { setAttribute: jest.fn() }
    next = jest.fn()
    jest.spyOn(trace, 'getActiveSpan').mockReturnValue(span)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('adds the user id and uuid to the active span', () => {
    const req = { user: { id: '1234', userUuid: '11111111-1111-1111-1111-111111111111' } }

    addUserMetadataToTelemetry(req, {}, next)

    expect(span.setAttribute).toHaveBeenCalledWith('userId', '1234')
    expect(span.setAttribute).toHaveBeenCalledWith('userUuid', '11111111-1111-1111-1111-111111111111')
    expect(next).toHaveBeenCalled()
  })

  it('omits identifiers that are missing', () => {
    const req = { user: { id: '1234', userUuid: null } }

    addUserMetadataToTelemetry(req, {}, next)

    expect(span.setAttribute).toHaveBeenCalledTimes(1)
    expect(span.setAttribute).toHaveBeenCalledWith('userId', '1234')
    expect(next).toHaveBeenCalled()
  })

  it('does nothing when there is no signed-in user', () => {
    addUserMetadataToTelemetry({}, {}, next)

    expect(span.setAttribute).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  it('calls next when there is no active span', () => {
    trace.getActiveSpan.mockReturnValue(undefined)

    addUserMetadataToTelemetry({ user: { id: '1234' } }, {}, next)

    expect(next).toHaveBeenCalled()
  })
})
