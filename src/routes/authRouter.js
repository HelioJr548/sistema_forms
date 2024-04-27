const express = require('express');
const path = require('path');

const AuthController = require('../controllers/Auth/AuthController');
const {
	checkAuthentication,
} = require('../controllers/Middlewares/authentication');

const routes = express.Router();

routes.post('/signup', AuthController.register);

routes.get('/logout', AuthController.logout);

// Usando path.join() para construir o caminho para a view
routes.route('/login')
	// .get((req, res) => {
	// 	res.sendFile(path.join(__dirname, '..', 'views', 'shared', 'login'));
	// })
	.post(AuthController.login);

routes.get('/admin', checkAuthentication, (req, res) => {
	// Se chegou até aqui, o token é válido e o usuário está autorizado
	res.json({
		mensagem: 'Usuário autorizado para acessar esta rota',
		usuario: req.usuario,
	});
});

module.exports = routes;
