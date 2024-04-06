const express = require('express');
const FormController = require('./controllers/FormController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/', (req, res) => {
	return res.json({ hello: 'World' });
});

routes.get('/forms', FormController.index);
routes.post('/forms', FormController.store);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.post('/forms/:title/users', FormController.storeUser);

module.exports = routes;
