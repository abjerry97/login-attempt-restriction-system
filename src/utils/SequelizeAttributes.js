const sequelize = require("sequelize");
const {
  MockQueryInterface,
  read,
} = require("./ReaderMigrationSequelize");

const newMockQueryInterface = new MockQueryInterface();

read(sequelize, newMockQueryInterface, "migrations");

const SequelizeAttributes = newMockQueryInterface.attributeTables;

module.exports= SequelizeAttributes;
