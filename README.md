# callback-to-stream

Simple readable stream that uses a callback as the source.

## Installation

    $ npm i -S callback-to-stream

## Usage

```js
'use strict';

var callbackStream = require('..');

// Emit an error event.
// This will throw the error.
callbackStream(next => {
  next(new Error('Nope!'));
})
.on('error', err => {
  throw err;
})
.read();

// Emit data
callbackStream(next => {
  process.nextTick(() => {
    next(null, 'my data');
  });
})
.on('data', d => {
  console.log(d); // => 'my data'
})
.read();
```
