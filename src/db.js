const mongodb = require('mongodb');

const logger = require('./logger');

const mongoClient = mongodb.MongoClient;

// Connection URL
const {
    MONGO_URI,
    MONGO_DB,
} = process.env;

const dbName = MONGO_DB;
const collectionName = 'data';
const client = new mongoClient(MONGO_URI);

let db;

const setup = () => client.connect((err) => {
    if (err) logger.error(`${err}`);
    logger.info('📦 connection to Mongo Successful');
    db = client.db(dbName);
});

const dump = (payload) => {
    db.collection(collectionName).insertOne(payload, function(err, res) {
        if (err) {
            logger.error({ method: 'db.dump', message: `${err}` });
            return;
        };
    });
};

const byTopic = async (topic) => {
    const data = await db.collection(collectionName).find({ topic }).toArray();
    return data;
};

module.exports = {
    db, setup, dump, byTopic
}
