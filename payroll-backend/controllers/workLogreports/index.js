const uploadReport = require('./uploadReport');
const { expressErrorHandler } = require('../../services/errorHandlers');

module.exports = {
  uploadReport: expressErrorHandler(uploadReport),
};
