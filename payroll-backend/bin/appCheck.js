// TODO:
// ENV variable checks
// JobGroupRates values
//
const { errorHandler } = require('../services/errorHandlers');
const prefillDataForJobRates = require('./prefillJobGroupRates');
const checkAllEnvironmentVariables = require('./envCheck');

errorHandler(prefillDataForJobRates)();
checkAllEnvironmentVariables();
