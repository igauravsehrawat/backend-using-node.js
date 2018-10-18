const checkAllEnvironmentVariables = () => {
  const envVars = [
    'ENV',
    'PORT',
    'MONGO_DB_USER',
    'MONGO_DB_PASSWORD',
    'MONGO_DB_HOST',
    'MONGO_DB_PORT',
    'DEBUG',
    'SENTRY_DSN',
    'MONGO_INITDB_ROOT_USERNAME',
    'MONGO_INITDB_ROOT_PASSWORD',
    'MONGO_INITDB_DATABASE',
  ];

  envVars.forEach((item) => {
    if (process.env[item] === undefined) {
      console.info(`environment variable ${item} is missing.`);
      console.error('Please set all the variables');
      process.exit();
    }
  });
};

module.exports = checkAllEnvironmentVariables;
