const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Form = require('../models/Form');

const connection = new Sequelize(dbConfig);

Form.init(connection);

module.exports = connection;
