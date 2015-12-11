'use strict';

var util = require('util');
var stream = require('stream');

module.exports = callbackStream;

/**
 * Simple readable stream that uses a callback as the source.
 */

function callbackStream(callback) {
  var ended = false;
  var eofPushed = false;

  // Implement a subclass of readable stream
  function CallbackStream() {
    stream.Readable.call(this, {objectMode: true});
  }
  util.inherits(CallbackStream, stream.Readable);

  CallbackStream.prototype._read = function() {
    var self = this;
    if (ended) {
      if (!eofPushed) self.push(null);
      return;
    }
    callback(function(err, data) {
      if (err) return self.emit('error', err);
      self.push(data);
      ended = true;
      if (data === null) eofPushed = true;
    });
  };

  return new CallbackStream();
}
