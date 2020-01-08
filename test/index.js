"use strict";

const splitRandomly = require ('./../')
const assert = require ('assert')

const string_value = "✨Hello👑, 😍World!😇!"

let error_count = 0
let substrings ;

function assertWithInfo (value, message) {
  process.stdout.write (message)
  try {
    assert (value, message)
    console.log (' ... OK')
  }
  catch (error) {
    console.log (' ... FAIL')
    console.error (error)
    error_count += 1
  }
}

process.once ('exit', function (code) {
  process.exit (Math.min (1, error_count))
})

substrings = splitRandomly (string_value)
assertWithInfo (
    substrings.length >= 1 && substrings.length <= string_value.length
  , 'Count of substrings returned should be, at most, equal to input string length, or have a length of one, when no substring count is specified'
)

substrings = splitRandomly (string_value, 100)
assertWithInfo (
    substrings.length === string_value.length
  , 'Count of substrings returned should equal the input string length when substring count specified is greater than string length'
)

substrings = splitRandomly (string_value, -100)
assertWithInfo (
    substrings.length === 1
  , 'Count of substrings returned should be one when substring count specified is lesser than one'
)

substrings = splitRandomly ('', -100)
assertWithInfo (
    substrings.length === 1
  , 'Count of substrings returned should be one when substring count specified is lesser than 1 and string length is zero'
)

substrings = splitRandomly (string_value, 3)
assertWithInfo (
    substrings.length === 3
  , 'Count of substrings returned be equal to the substring count when specified as value of one up to the length of the input string'
)

assertWithInfo (
    substrings.join ('') === string_value
  , 'A joined randomly split string should be equal to the unsplit string'
)

let substrings_compare = splitRandomly (string_value, 3)
assertWithInfo (
    substrings_compare.every (
      function (value, index) {
        return value === substrings[index]
      }
    ) === false
  , 'The same string split consectively with the same substring count should have a different result'
)
