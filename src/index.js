// import external libraries
const dotenv = require('dotenv');

dotenv.config();

// import internal utilities
const rest = require('./protocols/rest');
const mqtt = require('./protocols/mqtt');
const coap = require('./protocols/coap');
const broker = require('./protocols/broker');
// read config
// ex: port #s, redis host, username, pass etc

const protocols = [rest, mqtt, coap];
broker.registerProtocols(protocols);
broker.startWorking();

// setup
protocols.map(protocol => {
    protocol.setup();
});