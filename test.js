'use strict'

var tap = require('tap')
var AsyncValuePromise = require('./')

tap.test('resolve', t => {
  var promise = new AsyncValuePromise()

  promise.then(value => {
    t.equal(value, 'hello')
    t.end()
  })

  setImmediate(() => {
    promise.resolve('hello')
  })
})

tap.test('reject', t => {
  var promise = new AsyncValuePromise()

  promise.then(null, error => {
    t.equal(error, 'hello')
    t.end()
  })

  setImmediate(() => {
    promise.reject('hello')
  })
})

tap.test('throw on reject after resolve', t => {
  var promise = new AsyncValuePromise()
  promise.resolve('pass')
  t.throws(() => promise.reject('fail'))
  t.end()
})

tap.test('throw on resolve after reject', t => {
  var promise = new AsyncValuePromise()
  promise.reject('fail')
  t.throws(() => promise.resolve('pass'))
  t.end()
})
