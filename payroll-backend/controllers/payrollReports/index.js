const getReport = require('./getReport');
const { expressErrorHandler } = require('../../services/errorHandlers');

module.exports = {
  getReport: expressErrorHandler(getReport),
};
