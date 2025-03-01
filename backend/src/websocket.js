const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

const connections = [];
let io;

exports.setupWebSocket = server => {
  io = socketio(server);

  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs)
    });
  });
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return calculateDistance(coordinates, connection.coordinates) < 10
      && connection.techs.some(item => techs.includes(item));
  });
};

exports.sendMessage = (to, message, data) => {
  console.log(to);
  console.log(data);
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
}




// io.on('connection', (server) => {

// });

// funciona como um event listener, quando
// um evento ocorrer por meio do socket
// essa funcao eh chamada