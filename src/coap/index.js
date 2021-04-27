const logger = require('../logger');

const onMessageSubscribers = [];

const onMessage = (handler) => {
    onMessageSubscribers.push(handler);
}

const messageFromOtherProtocol = (payload) => {
    logger.debug('caop', payload);
}

const broadCast = async (payload) => {
    onMessageSubscribers.map(handler => handler(payload));
}

const setup = () => {

}

module.exports = {
    onMessage, messageFromOtherProtocol, setup
}