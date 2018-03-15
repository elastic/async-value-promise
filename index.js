'use strict'

const AsyncValue = require('async-value')
const assert = require('assert')

module.exports = class AsyncValuePromise {
  constructor(value, error) {
    this.value = error ? null : new AsyncValue(value)
    this.error = value ? null : new AsyncValue(error)
  }

  then(success, fail) {
    if (success && this.value) {
      this.value.get(success)
    }
    if (fail && this.error) {
      this.error.get(fail)
    }
  }

  resolve(value) {
    assert(this.value, 'already rejected')
    this.value.set(value)
    this.error = null
  }

  reject(error) {
    assert(this.error, 'already resolved')
    this.error.set(error)
    this.value = null
  }
}
