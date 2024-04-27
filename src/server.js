require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');

const express = require('express');
const routes = require('./routes');

require('./database');

const app = express();
app.use(express.static(path.join(__dirname, 'views/shared')));
// app.use(express.static(path.join(__dirname, 'views/forms')));
app.use(express.static(path.join(__dirname, 'views/home')));

app.use(express.json());
app.use(cookieParser());

app.use(routes);

app.listen(process.env.PORT);
