// questionsRouter.js
const express = require('express');
const QuestionController = require('../controllers/QuestionController');

const routes = express.Router();

// Question routes
routes
    .route('/questions')
    .get(QuestionController.index)
    .post(QuestionController.store);

module.exports = routes;
