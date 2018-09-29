const fileValidator = (req, res, next) => {
  if (!req.file || !req.file.fieldname) {
    throw Error('Please attach a file.');
  }
  next();
};

module.exports = {
  fileValidator,
};
