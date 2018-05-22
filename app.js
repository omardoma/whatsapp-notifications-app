const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(
  cors({
    origin: true,
  }),
);
app.use(helmet());
app.use((req, res) => {
  res
    .status(404)
    .send('This is a Socket.io real-time server, no HTTP routes are defined.');
});

module.exports = app;
