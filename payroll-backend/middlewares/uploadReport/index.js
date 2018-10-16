const sendResponse = require('../../helpers/sendReponse');

const fileValidator = (req, res, next) => {
  if (!req.file || !req.file.fieldname) {
    return sendResponse(
      res,
      422,
      {},
      'Please attach a csv file.',
    );
  }
  return next();
};

module.exports = {
  fileValidator,
};
