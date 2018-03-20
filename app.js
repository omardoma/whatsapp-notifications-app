const express = require('express'),
  logger = require('morgan'),
  cors = require('cors'),
  helmet = require('helmet'),
  app = express();

app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  })
);
app.use(helmet());

module.exports = app;
