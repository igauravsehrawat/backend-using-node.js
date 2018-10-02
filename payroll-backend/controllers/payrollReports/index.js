const getReport = require('./getReport');
const getAllReports = require('./getAllReports');
const { expressErrorHandler } = require('../../services/errorHandlers');

module.exports = {
  getAllReports: expressErrorHandler(getAllReports),
  getReport: expressErrorHandler(getReport),
};
