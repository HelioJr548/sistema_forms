// associationsRouter.js
const express = require('express');
const UserFormsController = require('../controllers/associations/UserFormsController');
const FormQuestionsController = require('../controllers/associations/FormQuestionsController');
const QuestionOptionsController = require('../controllers/associations/QuestionOptionsController');

const routes = express.Router();

// User-Form association routes
routes
    .route('/forms/:title/users')
    .get(UserFormsController.index)
    .post(UserFormsController.linkUserToForm);

// Form-Question association routes
routes
    .route('/forms/:title/questions')
    .get(FormQuestionsController.index)
    .post(FormQuestionsController.linkQuestionToForm);

// Qeustion-Options association routes
routes
    .route('/forms/:title/questions/options')
    .get(QuestionOptionsController.index)
    .post(QuestionOptionsController.linkOptionToQuestion);

routes
    .route('/teste')
    .get(QuestionOptionsController.getFormData);
module.exports = routes;
