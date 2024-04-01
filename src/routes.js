const express = require('express');
const FormController = require('./controllers/FormController');

const routes = express.Router();

routes.get('/', (req, res) => {
	return res.json({ hello: 'World' });
});

routes.get('/forms', FormController.index);
routes.post('/forms', FormController.store);

module.exports = routes;
