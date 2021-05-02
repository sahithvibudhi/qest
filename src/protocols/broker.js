const redis = require('mqemitter-redis');
const logger = require('../logger');

const { 
    REDIS_PORT,
    REDIS_HOST,
    REDIS_PASSWORD,
    REDIS_DB
} = process.env;

var mq = redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
    db: REDIS_DB
});

const emit = (msg) => {
    mq.emit(msg, function () {
        logger.debug('🏁', msg);
    });
};

module.exports = {
    emit,
    emitterInstance: mq,
}