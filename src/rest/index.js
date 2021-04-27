const express = require('express');

const logger = require('../logger');

const app = express();
const port = 8000;

const onMessageSubscribers = [];

const onMessage = (handler) => {
    onMessageSubscribers.push(handler);
}

const messageFromOtherProtocol = (payload) => {
    logger.debug('rest', payload);
}

const broadCast = async (payload) => {
    onMessageSubscribers.map(handler => handler(payload));
}

const setup = () => {
    app.listen(port, () => {
        logger.info('🚀 REST server is up and running on port: %s', port);
    });
}

module.exports = {
    onMessage, messageFromOtherProtocol, setup
}