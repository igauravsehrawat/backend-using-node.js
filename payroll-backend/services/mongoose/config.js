const mongoProps = {
  db: process.env.MONGO_INITDB_DATABASE,
  user: process.env.MONGO_DB_USER,
  password: process.env.MONGO_DB_PASSWORD,
  host: process.env.MONGO_DB_HOST,
  port: process.env.MONGO_DB_PORT,
};

module.exports = mongoProps;
