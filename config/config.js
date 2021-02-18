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
    username: "sgednfjo",
    password: "OtGwpWeYvLU9X1QFoSsLyP_U5F84_arS",
    database: "sgednfjo",
    host: "ziggy.db.elephantsql.com",
    dialect: 'postgres' 
  },
  production: {
     
    username: "pmnmnvlx",
    password: "dLy4ghevBbyNvg9YnVIMoIHOJuDo5bOb",
    database: "pmnmnvlx",
    host: "ziggy.db.elephantsql.com",
    dialect: 'postgres' 
  }
};




