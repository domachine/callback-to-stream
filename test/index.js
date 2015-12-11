'use strict';

var test = require('tape');
var callbackStream = require('..');

test('Emit an error event', function(t) {
  t.plan(1);
  callbackStream(function(next) {
    next(new Error('Nope!'));
  })
  .on('error', function(err) {
    t.assert(err.message === 'Nope!');
    t.end();
  })
  .read();
});

test('Emit data', function(t) {
  t.plan(1);
  var data = null;
  callbackStream(function(next) {
    process.nextTick(function() {
      next(null, 'my data');
    });
  })
  .on('data', function(d) {
    data = d;
  })
  .on('end', function() {
    t.assert(data === 'my data');
    t.end();
  })
  .read();
});

test('Emit nothing', function(t) {
  callbackStream(function(next) {
    next(null, null);
  })
  .on('data', function() {
    t.assert(false);
  })
  .on('end', function() {
    t.end();
  });
});
