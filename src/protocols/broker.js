const redis = require('mqemitter-redis');
const logger = require('../logger');

const { 
    REDIS_PORT,
    REDIS_HOST,
    REDIS_PASSWORD,
    REDIS_DB
} = process.env;

const protocolList = [];

var mq = redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
    db: REDIS_DB
});

const emit = ({protocol, payload}) => {
    const msg = {topic: protocol, payload};
    mq.emit(msg, function () {
        logger.debug('🏁', msg);
    });
};

const registerProtocol = (protocol) => protocolList.push(protocol);

const registerProtocols = (protocols) => protocols.map(protocol => registerProtocol(protocol));

const startWorking = () => {
    protocolList.map(protocol => {
        const otherProtocols = protocolList.filter(thisProtocol => thisProtocol != protocol);
        // each protocol subscribes to topics from all other protocols
        // ex: REST is subscribing to MQTT, CoAP

        mq.on(protocol.protocol, function (message, cb) {
            otherProtocols.map(otherProtocol => {
                otherProtocol.messageFromOtherProtocol(message.payload);
            });
            // call callback when you are done
            // do not pass any errors, the emitter cannot handle it.
            cb();
        });
    });
};

module.exports = {
    emit,
    emitterInstance: mq,
    registerProtocol,
    registerProtocols,
    startWorking,
}