const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morganLogger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const { winstonLogger } = require('./services/errorHandlers');

const index = require('./routes/index');
const workLogReports = require('./routes/workLogReports');
const payrollReports = require('./routes/payrollReports');
const sendResponse = require('./helpers/sendReponse');
const { Sentry } = require('./services/errorHandlers');

const app = express();

// error reporting

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

// error reporting

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morganLogger('combined', winstonLogger));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/worklog-reports', workLogReports);
app.use('/payroll-reports', payrollReports);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.error(err);
  winstonLogger.error(err);
  Sentry.captureException(err);
  return sendResponse(
    res,
    err.status || 500,
    {},
    err.message || 'Something went wrong',
  );
});

module.exports = app;
