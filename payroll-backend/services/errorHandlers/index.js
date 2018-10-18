const Sentry = require('./sentry');
const winstonLogger = require('./winstonLogger');

/**
 * This is central function to catch error from async function
 * Instead of writing try...catch block for each async,
 * this utility can be used to wrap it and use as normal function.
 *
 * req, res, next are passed to fn, which are the controller arguments
 * @param {function} fn express route controller
 */
const expressErrorHandler = fn => (req, res, next) => fn(req, res, next).catch((err) => {
  next({ err });
});

const errorHandler = fn => (...params) => fn(params).catch((err) => {
  console.error(err);
  winstonLogger.error(err.err && err.err.stack);
  Sentry.captureException(err);
});

module.exports = {
  errorHandler,
  expressErrorHandler,
  winstonLogger,
  Sentry,
};
