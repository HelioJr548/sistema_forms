// usersRouter.js
const express = require('express');
const UserController = require('../controllers/UserController');

const routes = express.Router();

// User routes
routes.route('/users').get(UserController.index).post(UserController.store);

module.exports = routes;
