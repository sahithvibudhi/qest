const express = require('express');

const logger = require('../../logger');
const broker = require('../broker');
const db = require('../../db');

const app = express();
const port = process.env.REST_PORT;
const protocol = 'REST';

const messageFromOtherProtocol = (payload) => {
    logger.debug('rest', payload);
}

app.use(express.json());

app.get('/api/:topic', async (req, res) => {
    const {topic} = req.params;
    const data = await db.byTopic(topic);
    return res.json(data);
});

app.post('/api/:topic', (req, res) => {
    const {topic} = req.params;
    const {body} = req;
    const payload = {
        protocol,
        // request_id: client.id, TODO
        topic,
        payload: body,
        timestamp: new Date().getTime(),
    };
    broker.emit({protocol, payload});
    db.dump(payload);
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