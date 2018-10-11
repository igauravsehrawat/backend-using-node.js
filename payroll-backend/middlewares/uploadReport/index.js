const fileValidator = (req, res, next) => {
  if (!req.file || !req.file.fieldname) {
    throw Error('Please attach a csv file.');
  }
  next();
};

module.exports = {
  fileValidator,
};
