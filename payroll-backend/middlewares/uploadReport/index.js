const sendResponse = require('../../helpers/sendReponse');

const fileValidator = (req, res, next) => {
  if (!req.file || !req.file.fieldname) {
    sendResponse(
      res,
      422,
      {},
      'Please attach a csv file.',
    );
  }
  next();
};

module.exports = {
  fileValidator,
};
