module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./db.development.sqlite"
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:"
  },
  dev: {
    username: "manifestUser",
    password: "manifestPassword",
    database: "blogapp",
    host: "manifestdbinstance.cgq0reqixqsd.us-east-1.rds.amazonaws.com",
    dialect: 'postgres' 
  },
  production: {
    username: "manifestUser",
    password: "manifestPassword",
    database: "blogapp",
    host: "manifestdbinstance.cgq0reqixqsd.us-east-1.rds.amazonaws.com",
    dialect: 'postgres' 
  }
  // ,
  // production: {
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  //   host: process.env.DB_HOSTNAME,
  //   dialect: 'mysql',
  //   use_env_variable: 'DATABASE_URL'
  // }
};
