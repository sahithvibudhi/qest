// import external libraries


// import internal utilities
const rest = require('./rest');
const mqtt = require('./mqtt');
const coap = require('./coap');

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