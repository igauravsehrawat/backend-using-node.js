const mongoose = require('mongoose');
const {
  db, user, password, host, port,
} = require('./config');

mongoose.Promise = require('bluebird');

const connectionUrl = `mongodb://${user}:${password}@${host}:${port}/${db}`;
const options = {
  useNewUrlParser: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
};

mongoose.connect(connectionUrl, options, (err) => {
  if (err) {
    console.info('​Mongoose connection established', err);
  }
});

mongoose.connection.on('connected', (err) => {
  if (err) {
    console.info('​err', err);
  }
  console.info('Mongoose connected.');
});

mongoose.connection.on('error', (err) => {
  console.info(`Error in connecting with mongoose ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.info('Mongoose disconnected.');
});

mongoose.set('debug', process.env.ENV === 'dev');

module.exports = mongoose;
