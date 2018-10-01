const moment = require('moment');
const WorkLog = require('../../../models/WorkLog');
const JobGroupRate = require('../../../models/JobGroupRate');

const jobGroupRatesMap = async () => {
  const allRates = await JobGroupRate.find({}).lean().exec();
  const jobGroupRates = {};
  allRates.forEach((rate) => {
    jobGroupRates[rate.jobGroup] = rate.perHourRate;
  });
  return jobGroupRates;
};

const isDateLessOrEqualTo15th = (date) => {
  const month = moment(date).get('month');
  const year = moment(date).get('year');
  const date15th = moment().set({ date: 15, month, year });
  if (date <= date15th) {
    return true;
  }
  return false;
};

const generateNthOfMonth = (date, n) => {
  const momentDate = moment(date);
  const month = momentDate.get('month');
  const year = momentDate.get('year');
  const dateNth = moment().set({
    date: n,
    month,
    year,
  });
  return dateNth;
};

const generatePayPeriod = (date) => {
  if (isDateLessOrEqualTo15th(date)) {
    return `${generateNthOfMonth(date, 1)}-${generateNthOfMonth(date, 15)}`;
  }
  return `${generateNthOfMonth(date, 16)}-${generateNthOfMonth(date, 30)}`;
};

const generatePayrollReport = async () => {
  const allWorkLogs = await WorkLog.find({}).lean().exec();
  const jobGroupRates = await jobGroupRatesMap();

  const employeePayPeriodMap = {};
  const payrollReport = [];

  allWorkLogs.forEach((workLog) => {
    const {
      employeeId, hoursWorked, date, jobGroup,
    } = workLog;
    const payPeriod = generatePayPeriod(date);
    const key = `${employeeId}-${payPeriod}`;
    if (employeePayPeriodMap[key]) {
      employeePayPeriodMap[key].amount += hoursWorked * jobGroupRates[jobGroup];
    } else {
      employeePayPeriodMap[key] = {
        employeeId,
        payPeriod,
        amount: 0,
      };
    }
  });

  Object.keys(employeePayPeriodMap).forEach((key) => {
    const payrollRow = {
      ...employeePayPeriodMap[key],
    };
    payrollReport.push(payrollRow);
  });
  return payrollReport;
};

module.exports = generatePayrollReport;
