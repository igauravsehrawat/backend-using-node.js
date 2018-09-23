const mongoose = require('mongoose');
const {
  db, user, password, host, port,
} = require('./config');

mongoose.Promise = require('bluebird');

const connectionUrl = `mongodb://${user}:${password}@${host}:${port}/${db}`;
const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
};

mongoose.connect(connectionUrl, options, (err) => {
  if (err) {
    console.log('​mongoose connection established', err);
  }
});

mongoose.connection.on('connected', (err) => {
  if (err) {
    console.log('​err', err);
  }
  console.log('connected');
});

mongoose.connection.on('error', (err) => {
  console.log(`Error in connecting with mongoose ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected.');
});

module.exports = mongoose;
