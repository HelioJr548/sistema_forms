const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Form = require('../models/Form');
const User = require('../models/User');
const Question = require('../models/Question');
const Option = require('../models/Option');
const Answer = require('../models/Answer');

const connection = new Sequelize(dbConfig);

Form.init(connection);
User.init(connection);
Question.init(connection);
Option.init(connection);
Answer.init(connection);

Form.associate(connection.models);
User.associate(connection.models);
Question.associate(connection.models);
Option.associate(connection.models);
Answer.associate(connection.models);

module.exports = connection;
