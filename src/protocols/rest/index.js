const express = require('express');

const logger = require('../../logger');

const app = express();
const port = 8000;
const protocol = 'REST';

const messageFromOtherProtocol = (payload) => {
    logger.debug('rest', payload);
}

const broadCast = async (payload) => {
    onMessageSubscribers.map(handler => handler(payload));
}

app.use(express.json());

app.post('/api/:topic', (req, res) => {
    const {topic} = req.params;
    const {body} = req;
    broadCast({
        protocol,
        // request_id: client.id, TODO
        topic,
        payload: body,
        timestamp: new Date().getTime(),
    });
    res.json({
        topic, body
    });
});

const setup = () => {
    app.listen(port, () => {
        logger.info('🚀 REST server is up and running on port: %s', port);
    });
}

module.exports = {
    messageFromOtherProtocol, setup, protocol
}