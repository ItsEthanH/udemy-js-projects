const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/location');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  next();
});

app.use(routes);

app.listen(3000);
