// questionsRouter.js
const express = require('express');

const AuthController = require('../controllers/Auth/AuthController');

const routes = express.Router();

// Question routes
routes
	.route('/signup')
	.get((req, res) => {
		res.sendFile(`D:/repos/sistema_forms/src/views/shared/signup`);
	})
	.post(AuthController.register);

routes
	.route('/login')
	.get((req, res) => {
		res.sendFile(`D:/repos/sistema_forms/src/views/shared/login`);
	})
	.post(AuthController.login);

routes.route('/home').get((req, res) => {
	res.sendFile(`D:/repos/sistema_forms/src/views/admin/index.html`);
});

module.exports = routes;
