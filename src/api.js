// API used by the clients
let Q = require('q');
let buss = undefined;

module.exports.TRACE = 1;
module.exports.DEBUG = 2;
module.exports.INFO  = 3;
module.exports.WARN  = 4;
module.exports.ERROR = 5;

const trace = console.log;
const debug = (function(){
    var timestamp = function(){};
    timestamp.toString = function(){
        console.log('Tjoho');
        return "[DEBUG " + (new Date).toLocaleTimeString() + "]";
    };

    return  console.log.bind(console, '%s', timestamp);
})();
const info = console.info;
const warn = console.warn;
const error = console.error;
const silent = () => {};

module.exports.trace = trace;
module.exports.debug = debug;
module.exports.info = info;
module.exports.warn = warn;
module.exports.error = error;

// Init the client api with the buss used by the client
exports.init = (_buss) => {
    buss = _buss;
};

// Init the client api with the buss used by the client
exports.setLogLevel = (LEVEL) => {

    module.exports.trace = silent;
    module.exports.debug = silent;
    module.exports.info = silent;
    module.exports.warn = silent;
    module.exports.error = silent;

    switch(LEVEL){
        case module.exports.TRACE:
            module.exports.trace = trace;
        case module.exports.DEBUG:
            module.exports.debug = debug;
        case module.exports.INFO:
            module.exports.info = info;
        case module.exports.WARN:
            module.exports.warn = warn;
        case module.exports.ERROR:
            module.exports.error = error;
    }
};

var bunyan = require('bunyan');
var Bunyan2Loggly = require('bunyan-loggly');
var conf = require('../crib.conf');
var logglyStream = new Bunyan2Loggly(conf.log);




module.exports.createLogger = (name, level) =>
    bunyan.createLogger({name,
        streams: [
            {
                stream: process.stdout,
                level,
            },
            {
                type: 'raw',
                stream: logglyStream
            }]
    });