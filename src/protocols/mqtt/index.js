const net = require('net');

const aedesFunc = require('aedes');

const broker = require('../broker');
const logger = require('../../logger');
const db = require('../../db');

// TODO: 
// read MONGO_URL, port from env
// user persistant mongo with aedes - already installed
const protocol = 'MQTT';
const aedes = aedesFunc({
    mq: broker.emitterInstance
});
const server = net.createServer(aedes.handle)
const port = process.env.MQTT_PORT;

const messageFromOtherProtocol = (payload) => {
    logger.debug(protocol, payload);
    aedes.publish({
        cmd: 'publish',
         // TODO: figure out and change this later
        messageId: 42,
        qos: 2,
        dup: false,
        topic: payload.topic,
        payload: Buffer.from(JSON.stringify(payload)),
        retain: false
    }, (err) => console.error(err));
}

aedes.on('publish', async function (packet, client) {
    if (!client) return;
    const payload = {
        protocol,
        request_id: client.id,
        topic: packet.topic,
        payload: packet.payload.toString(),
        timestamp: new Date().getTime(),
    };
    db.dump(payload);
})

const setup = () => {
    server.listen(port, function () {
        logger.info('🚀 MQTT server is up and running on port: %s', port);
    });
}

module.exports = {
    messageFromOtherProtocol, setup, protocol
}