# How to add a protocol:

1. Create a Folder in `/src` with your protocol name
2. Write `src/<protocol>/index.js` with the methods mentioned below
3. Now import and register your protocol in `src/index.js`

## Methods in your index.js
`onMessage`

We can use this method to subscribe for events on this protocol.

Args: Callback - Pass a function which needs to be called when a message is received on this protocol.
Message Payload is passed



`messageFromOtherProtocol`

Write this method on your protocol file to subscribe for messages on other protocols
