require("reflect-metadata");
const { DataSource } = require("typeorm");
const User = require("../entities/User"); // Your entity
const UserSession = require("../entities/UserSession");
const Mode = require("../entities/Mode");
const Category = require("../entities/Category");
const Transaction = require("../entities/Transaction");
const Rating = require("../entities/Rating");
const username=process.env.SQL_DB_USERNAME;
const password=process.env.SQL_DB_PASSWORD;
const db_name=process.env.SQL_DB_NAME
const host=process.env.SQL_DB_HOST;
const port=process.env.SQL_DB_PORT;
// const port=2803;


const AppDataSource = new DataSource({
  type: "mysql",           // Change to your DB type (e.g. "postgres", "sqlite", etc.)
  host: host,
  port: port,
  username: username,
  password: password,
  database: db_name,
  synchronize: true,      // Use migrations in production, not synchronize:true
  logging: false,
  entities: [User,UserSession,Mode,Category,Transaction,Rating],        // Array of your entity schemas
  migrations: [],
  subscribers: [],
});

module.exports = { AppDataSource };
