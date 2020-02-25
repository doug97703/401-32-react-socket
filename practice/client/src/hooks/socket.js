import io from 'socket.io-client';
const connection =  io.connect('http://localhost:3001');

const socket = (callback) => {

  const subscribe = (event, cb) => {
    connection.on(event, message => {
      cb(message)
    })
  }

  const publish = (event, payload) => {
    connection.emit(event, payload)
  }

  return [
    subscribe,
    publish,
  ];
  
};

export default socket;
