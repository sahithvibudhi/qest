// import external libraries
const dotenv = require('dotenv');

dotenv.config();

// import internal utilities
const rest = require('./protocols/rest');
const mqtt = require('./protocols/mqtt');
const coap = require('./protocols/coap');

// read config
// ex: port #s, redis host, username, pass etc

const protocols = [rest, mqtt, coap];
for (const idx in protocols) {
    const remainingProtocols = protocols.filter((ele, i) => i != idx);
    remainingProtocols.map(protocol => protocols[idx].onMessage(protocol.messageFromOtherProtocol));
}

// setup
protocols.map(protocol => {
    protocol.setup();
});