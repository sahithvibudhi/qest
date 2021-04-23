const net = require('net');

const aedesFunc = require('aedes');
const mqemitter = require('mqemitter-mongodb');
const mongoPersistence = require('aedes-persistence-mongodb');

// TODO: 
// read MONGO_URL, port from env
// user persistant mongo with aedes - already installed
const protocol = 'MQTT';
const MONGO_URI = process.env.MONGO_URI;
const aedes = aedesFunc({
    mq: mqemitter({
        url: MONGO_URI
    }),
    persistence: mongoPersistence({
        url: MONGO_URI,
        // Optional ttl settings
        ttl: {
            packets: 300, // Number of seconds
            subscriptions: 300
        }
    })
});
const server = net.createServer(aedes.handle)
const port = 1883

const onMessageSubscribers = [];

const onMessage = (handler) => {
    onMessageSubscribers.push(handler);
}

const messageFromOtherProtocol = (payload) => {
    console.log(payload);
}

const broadCast = async (payload) => {
    onMessageSubscribers.map(handler => handler(payload));
}

aedes.on('publish', async function (packet, client) {
    if (!client) return;
    broadCast({
        protocol,
        topic: packet.topic,
        payload: packet.payload.toString(),
    });
})

const setup = () => {
    server.listen(port, function () {
        console.log('server started and listening on port ', port)
    });
}

module.exports = {
    onMessage, messageFromOtherProtocol, setup
}