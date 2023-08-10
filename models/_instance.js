/* eslint-disable import/no-dynamic-require */
const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../src/config/database")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    // ...config,
    host: config.host,
    // port: config.port,
    dialect: config.dialect,
    logQueryParameters: true,
  }
);

const db = {
  sequelize,
  Sequelize,
};

module.exports= db;
