var cribLog = require('./src/api.js');

var log = cribLog.createLogger('crib-hue','info');
log.error('Hello hi with keys from conf file');