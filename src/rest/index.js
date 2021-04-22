const onMessageSubscribers = [];

const onMessage = (handler) => {
    onMessageSubscribers.push(handler);
}

const messageFromOtherProtocol = (payload) => {
    console.log(payload);
}

const broadCast = async (payload) => {
    onMessageSubscribers.map(handler => handler(payload));
}

module.exports = {
    onMessage, messageFromOtherProtocol
}