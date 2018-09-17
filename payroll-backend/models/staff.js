const Sequelize = require('sequelize');

const staff = Sequelize.define('staff', {
  employeeId: Sequelize.DOUBLE,
  date: Sequelize.DATEONLY,
  hoursWorked: Sequelize.DOUBLE,
  jobGroup: Sequelize.STRING,
  reportId: Sequelize.DOUBLE,
});

exports.default = staff;
