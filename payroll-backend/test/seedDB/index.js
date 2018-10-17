const JobGroupRate = require('../../models/JobGroupRate');
const WorkLog = require('../../models/WorkLog');

const { jobGroupRates, workLogs } = require('./data');

const deleteJobGroupRates = async () => {
  if (JobGroupRate.db.name !== 'payroll-test') {
    throw Error('Tests runs in test DB only. 🙏 Use test DB');
  }
  await JobGroupRate.deleteMany({});
};

const deleteWorkLogs = async () => {
  if (WorkLog.db.name !== 'payroll-test') {
    throw Error('Tests runs in test DB only. 🙏 Use tes DB');
  }
  await WorkLog.deleteMany({});
};

const insertJobGroupRates = async () => {
  await JobGroupRate.insertMany(jobGroupRates);
};

const insertWorkLogs = async () => {
  await WorkLog.insertMany(workLogs);
};


module.exports = {
  deleteJobGroupRates,
  deleteWorkLogs,
  insertJobGroupRates,
  insertWorkLogs,
};
