const WorkLog = require('../models/WorkLog');


const doesReportIdExist = async (reportId) => {
  const reportIdPresence = await WorkLog.findOne({
    reportId,
  }).lean().exec();
  if (reportIdPresence) {
    return true;
  }
  return false;
};

module.exports = doesReportIdExist;
