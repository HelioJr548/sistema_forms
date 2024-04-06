const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Form = require('../models/Form');
const User = require('../models/User');

const connection = new Sequelize(dbConfig);

Form.init(connection);
User.init(connection);
Form.associate(connection.models);
User.associate(connection.models);

module.exports = connection;
