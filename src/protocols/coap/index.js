const coap = require('coap');

const logger = require('../../logger');

const protocol = 'COAP';
const server = coap.createServer();
const port = 5683;

const messageFromOtherProtocol = (payload) => {
    logger.debug('caop', payload);
}

const broadCast = async (payload) => {
    onMessageSubscribers.map(handler => handler(payload));
}

server.on('request', function(req, res) {
    const path = req.url.split('/');
    if (path.length  < 1) {
        res.end('');
        return;
    }
    console.log(res);
    console.log(req.payload);
    console.log(req.method);
    res.end('Hello ' + req.url.split('/')[1] + '\n')
});

const setup = () => {
    server.listen(function() {
        logger.info('🚀 COAP server is up and running on port: %s', port);
    });
}

module.exports = {
    messageFromOtherProtocol, setup, protocol
}