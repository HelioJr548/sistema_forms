// formsRouter.js
const express = require('express');
const FormController = require('../controllers/FormController');
const {
    checkAuthentication,
} = require('../controllers/Middlewares/authentication');

const routes = express.Router();

// Form routes
routes
    .route('/forms')
    .get(checkAuthentication, FormController.index)
    .post(FormController.store);

module.exports = routes;

//
