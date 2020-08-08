/**
 * 入口
 * @author john.gao
 */
'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./lib/yuso-util.min.js');
} else {
  module.exports = require('./lib/yuso-util.js');
}