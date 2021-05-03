const coap = require('coap');

const logger = require('../../logger');
const db = require('../../db');
const broker = require('../broker');

const protocol = 'COAP';
const server = coap.createServer();
const port = process.env.COAP_PORT;

const messageFromOtherProtocol = (payload) => {
    logger.debug(protocol, payload);
}
server.on('request', async (req, res) => {
    const path = req.url.split('/');
    if (path.length  < 3 || path[1] !== 'api') {
        res.end('ERR; expected route: /api/<topic-name>');
        return;
    }

    console.log(path);
    const topic = path[2];

    if (req.method === 'GET') {
        const data = await db.byTopic(topic);
        return res.end(JSON.stringify(data));
    } else if (req.method === 'POST') {
        const body = JSON.parse(req.payload.toString());
        const payload = {
            protocol,
            // request_id: client.id, TODO
            topic,
            payload: body,
            timestamp: new Date().getTime(),
        };
        broker.emit({protocol, payload});
        db.dump(payload);
        return res.end(JSON.stringify(payload));
    } else {
        return res.end('THIS HTTP VERB NOT IMPLEMENTED');
    }
});

const setup = () => {
    server.listen(function() {
        logger.info('🚀 COAP server is up and running on port: %s', port);
    });
}

module.exports = {
    messageFromOtherProtocol, setup, protocol
}