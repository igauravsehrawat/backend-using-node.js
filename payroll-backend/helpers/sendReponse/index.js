/**
 * @function
 * This function is to be used for sending response.
 * Helps in avoiding repetitive code.
 * DRY: Do not repeat principle
 *
 * @param {Object} res the response object coming from middleware
 * @param {Number} statusCode HTTP status code
 * @param {Object} data data to send
 * @param {String} message constructive message
 */

const sendResponse = (res, statusCode, data = {}, message) => {
  let status = 'Failure';

  const statusCodeCheck = /^[0-9]{3}/;

  if (!statusCodeCheck.test(statusCode)) {
    throw new Error('Status code has to a number');
  }
  const successCheck = /^2[0-9]{2}/;
  if (successCheck.test(statusCode)) {
    status = 'Success';
  }
  return res.status(statusCode).json({
    status,
    data,
    message,
  });
};

module.exports = sendResponse;
