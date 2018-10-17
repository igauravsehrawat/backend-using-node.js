const jobGroupRates = [
  {
    jobGroup: 'A',
    perHourRate: 20,
    currency: 'CAD',
  },
  {
    jobGroup: 'B',
    perHourRate: 30,
    currency: 'CAD',
  },
];

const workLogs = [
  {
    date: '2016-02-23T18:30:00.000Z',
    hoursWorked: 5,
    employeeId: 1,
    jobGroup: 'B',
    reportId: '44',
  },
  {
    date: '2015-02-22T18:30:00.000Z',
    hoursWorked: 5,
    employeeId: 2,
    jobGroup: 'A',
    reportId: '44',
  },
  {
    date: '2016-12-24T18:30:00.000Z',
    hoursWorked: 5,
    employeeId: 3,
    jobGroup: 'B',
    reportId: '44',
  },
  {
    date: '2016-12-23T18:30:00.000Z',
    hoursWorked: 5,
    employeeId: 4,
    jobGroup: 'B',
    reportId: '44',
  },
];

module.exports = {
  jobGroupRates,
  workLogs,
};
