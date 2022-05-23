const {
  countWords,
  isEmptyObject,
  removeUrlLevels,
  sortObject,
  catchAndReThrowError,
  isValidDate,
  encodeHTML,
  processReplacements,
  prettyDateAndTime,
  prettyDate,
  ageFrom,
  updateJsonValue,
} = require('./util')

const inputText = "There is a green hill far away - and I shouldn't tell you that really"

describe('should count words in text', () => {
  it('returns the correct number of words', () => {
    expect(countWords(inputText)).toEqual(14)
  })
})

describe('checks to see if an object is empty', () => {
  it('correctly recognises non-empty object', () => {
    const obj = { item: 'value', text: 'hello' }
    expect(isEmptyObject(obj)).toEqual(false)
  })
  it('correctly recognises empty objects', () => {
    expect(isEmptyObject({})).toEqual(true)
    expect(isEmptyObject()).toEqual(true)
    expect(isEmptyObject(null)).toEqual(true)
    expect(isEmptyObject(undefined)).toEqual(true)
  })
})

describe('removes appropriate number of levels from url', () => {
  it('removes 1 level', () => {
    const myUrl = 'levels/one/two/three/four'
    expect(removeUrlLevels(myUrl, 1)).toEqual('levels/one/two/three')
  })

  it('removes 3 levels', () => {
    const myUrl = 'levels/one/two/three/four'
    expect(removeUrlLevels(myUrl, 3)).toEqual('levels/one')
  })

  it('copes with being asked to remove too many levels', () => {
    const myUrl = 'levels/one/two/three/four'
    expect(removeUrlLevels(myUrl, 300)).toEqual('')
  })

  it('copes with being asked to remove no levels', () => {
    const myUrl = 'levels/one/two/three/four'
    expect(removeUrlLevels(myUrl, 0)).toEqual(myUrl)
  })

  it('copes with bad input for number of levels', () => {
    const myUrl = 'levels/one/two/three/four'
    expect(removeUrlLevels(myUrl, undefined)).toEqual(myUrl)
  })

  it('copes with missing parameter for number of levels', () => {
    const myUrl = 'levels/one/two/three/four'
    expect(removeUrlLevels(myUrl)).toEqual(myUrl)
  })
})

describe('sorts an object correctly', () => {
  let input
  beforeEach(() => {
    input = [
      { sortKey: 'a ', otherfield: 'qwer' },
      { sortKey: 'c ', otherfield: 'asdf' },
      { sortKey: 'b ', otherfield: 'zxcv' },
    ]
  })
  it('sorts object in ascending order', () => {
    const expected = [
      { sortKey: 'a ', otherfield: 'qwer' },
      { sortKey: 'b ', otherfield: 'zxcv' },
      { sortKey: 'c ', otherfield: 'asdf' },
    ]
    input.sort(sortObject('sortKey'))
    expect(input).toStrictEqual(expected)
  })
  it('sorts object in descending order', () => {
    const expected = [
      { sortKey: 'c ', otherfield: 'asdf' },
      { sortKey: 'b ', otherfield: 'zxcv' },
      { sortKey: 'a ', otherfield: 'qwer' },
    ]
    input.sort(sortObject('sortKey', 'desc'))
    expect(input).toStrictEqual(expected)
  })
  it('returns input if key field not present', () => {
    const expected = input
    input.sort(sortObject('notarealkey', 'desc'))
    expect(input).toStrictEqual(expected)
  })
})
describe('catchAndReThrowError', () => {
  const initialErrorMessage = 'error message 1'
  const initialError = new Error(initialErrorMessage)
  const secondaryErrorMessage = 'error message 2'
  const throwTheError = () => catchAndReThrowError(initialError, secondaryErrorMessage)
  it('should throw an Error', () => {
    expect(throwTheError).toThrow()
  })
  it('should concatenate the error message for the new error', () => {
    expect(throwTheError).toThrowError(`Error: ${initialErrorMessage} ${secondaryErrorMessage}`)
  })
})

describe('should check if date is valid', () => {
  it('likes a valid date input', () => {
    expect(isValidDate(1, 10, 2015)).toEqual(true)
  })
  it('returns false when an invalid date is input', () => {
    expect(isValidDate(31, 9, 2015)).toEqual(false)
    expect(isValidDate(29, 2, 2015)).toEqual(false)
  })
  it('return false when nonsense is put in', () => {
    expect(isValidDate('fish fingers', 'chips', 'peas')).toEqual(false)
  })
})

describe('encodeHTML', () => {
  it('should convert < > and quote characters to HTML encoded equivalents', () => {
    const inputString = '< > " \''
    expect(encodeHTML(inputString)).toEqual('&lt; &gt; &quot; &#039;')
  })

  it('should leave other text and existing encoded characters unchanged', () => {
    const inputString = '</textarea>&lt;&#x2F;textarea&gt;&lt;'
    expect(encodeHTML(inputString)).toEqual('&lt;/textarea&gt;&lt;&#x2F;textarea&gt;&lt;')
  })

  it('should replace specific patterns in json objects', () => {
    const input = { inputText: 'This name: [Name of person] should be inserted' }
    const replacements = { name: 'Jerry Only' }
    expect(processReplacements(input, replacements)).toEqual({ inputText: 'This name: Jerry Only should be inserted' })
  })

  it('should not replace when replacement item is not present', () => {
    const input = { inputText: 'This name: [Name of person] should not be inserted' }
    const replacements = { fullname: 'Jerry Only' }
    expect(processReplacements(input, replacements)).toEqual(input)
  })
})

describe('prettyDate', () => {
  it('formats date', () => {
    expect(prettyDate('2021-11-30T07:05:20+0000')).toEqual('30th November 2021')
    expect(prettyDate('2021-11-30')).toEqual('30th November 2021')
  })

  it('handles invalid dates', () => {
    expect(prettyDate('Some invalid input')).toBeNull()
    expect(prettyDate('')).toBeNull()
    expect(prettyDate(null)).toBeNull()
    expect(prettyDate(undefined)).toBeNull()
  })

  it('handles empty input', () => {
    expect(prettyDate()).toBeNull()
  })

  it('adjusts for DST', () => {
    expect(prettyDateAndTime('2022-03-25T07:00:00+0000')).toEqual('Friday 25th March 2022 7:00')
    expect(prettyDateAndTime('2022-03-27T23:30:00+0000')).toEqual('Monday 28th March 2022 0:30')
    expect(prettyDateAndTime('2022-03-28T07:00:00+0000')).toEqual('Monday 28th March 2022 8:00')
  })
})

describe('prettyDateAndTime', () => {
  it('formats date and time', () => {
    expect(prettyDateAndTime('2021-11-30T07:05:20+0000')).toEqual('Tuesday 30th November 2021 7:05')
  })

  it('handles invalid dates', () => {
    expect(prettyDateAndTime('Some invalid input')).toBeNull()
    expect(prettyDateAndTime('')).toBeNull()
    expect(prettyDateAndTime(null)).toBeNull()
    expect(prettyDateAndTime(undefined)).toBeNull()
  })

  it('handles empty input', () => {
    expect(prettyDateAndTime()).toBeNull()
  })

  it('adjusts for DST', () => {
    expect(prettyDateAndTime('2022-03-26T07:00:00+0000')).toEqual('Saturday 26th March 2022 7:00')
    expect(prettyDateAndTime('2022-03-28T07:00:00+0000')).toEqual('Monday 28th March 2022 8:00')
  })
})

describe('ageFrom', () => {
  const mockNow = new Date('2021-11-30T00:00:00+0000')

  it('returns the difference in years between the provided date and now', () => {
    expect(ageFrom('1989-01-19T00:00:00+0000', mockNow)).toEqual(32)
  })

  it('handles invalid dates', () => {
    expect(ageFrom('Some invalid input', mockNow)).toBeNull()
    expect(ageFrom('', mockNow)).toBeNull()
    expect(ageFrom(null, mockNow)).toBeNull()
    expect(ageFrom(undefined, mockNow)).toBeNull()
  })

  it('handles empty input', () => {
    expect(ageFrom()).toBeNull()
  })

  it('adjusts for DST', () => {
    expect(ageFrom('1989-03-28T00:00:00+0000', new Date('2022-03-27T22:30:00+0000'))).toEqual(32)
    expect(ageFrom('1989-03-28T00:00:00+0000', new Date('2022-03-27T23:30:00+0000'))).toEqual(33)
  })
})

// unit tests for updateJsonValue object

describe('tests for the updateJsonValue function', () => {
  it('creates a json object when json object is null and createNewObject is true', () => {
    const results = updateJsonValue(null, 'key', 'value', false)
    expect(results).toEqual({}) // a new json object is created
  })

  it('creates an empty object when json object is null', () => {
    const results = updateJsonValue(null, 'key', 'value', true)
    expect(results).toEqual({ key: 'value' })
  })

  it('updates the keys value if it already exist', () => {
    const myObject = { one: '1', two: '2', key: 'value' }
    const results = updateJsonValue(myObject, 'key', 'newValue', false)
    expect(results).toEqual({ one: '1', two: '2', key: 'newValue' })
  })

  it('updates the key value', () => {
    const myObject = { one: '1', two: '2' }
    const results = updateJsonValue(myObject, 'key', 'newValue', false)
    expect(results).toEqual({ one: '1', two: '2', key: 'newValue' })
  })

  it('if a key is not defined, return a json object', () => {
    const myObject = { one: '1', two: '2' }
    const results = updateJsonValue(myObject, null, 'value', false)
    expect(results).toEqual(myObject)
  })
})
