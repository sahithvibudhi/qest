# Qest
QEST - Bridge the gap between different IoT protocols

## 👷 Setup 
1. Git clone the repository to your local
```
git clone https://github.com/sahithvibudhi/qest.git
```

2. Change directory to where ever your project is
```
cd qest
```

3. Copy environment variables from .example.env to .env and make changes in the file accordingly
```
cp .example.env .env
```

4. You can start using docker using 
```
docker-compose up --force-recreate --build qest-broker
```

or 

```
npm start
```

## 🤔 How to add new protocol:
It is easy to add more protocols into this architecture.

All the protocols recide in the `src/protocols` directory. 

STEP 1: create a directory in  `src/protocols` with the name of the protocol<br/>
STEP 2: create an `index.js` file in the newly created directory<br/>
STEP 3: copy the following template and make necessary changes<br/>
```
// import your server here

// these are the helper utilities framework comes with
const logger = require('../../logger');
const broker = require('../broker');
const db = require('../../db');

// define the name of your protocol here
const protocol = 'REST';

// this method is triggered whenever there is a message recevied from other protocol
const messageFromOtherProtocol = (payload) => {
    logger.debug(protocol, payload);
}

// your protocol server related code if there is any, look at `src/protocol/rest/index.js` for example

// some handy helper functions by the framework:
// use: broker.emit({ ..JSON payload here }) to send the payload to other protocols
// use: db.dump({ ..JSON payload here }) to save the information to the datastore

// QEST uses the following JSON format for communication between the protocols
/*
{
        "protocol": "", // protocol name
        "topic": "", // where the message needs to pass
        payload: {}, // data that needs to be published
        timestamp: new Date().getTime(), // timestamp in UTC
}
*/

const setup = () => {
    // this is called when the QEST server starts
    // start the protocol server here
}

// do not touch these lines, these are used by framework to orchestrate the communication
module.exports = {
    messageFromOtherProtocol, setup, protocol
}
```
