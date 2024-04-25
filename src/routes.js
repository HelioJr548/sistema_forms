const express = require('express');
const formsRouter = require('./routes/formsRouter');
const usersRouter = require('./routes/usersRouter');
const questionsRouter = require('./routes/questionsRouter');
const associationsRouter = require('./routes/associationsRouter');
const authRouter = require('./routes/authRouter');

const mainRouter = express.Router();

mainRouter.use(formsRouter);
mainRouter.use(usersRouter);
mainRouter.use(questionsRouter);
mainRouter.use(associationsRouter);
mainRouter.use(associationsRouter);
mainRouter.use(authRouter);

module.exports = mainRouter;
