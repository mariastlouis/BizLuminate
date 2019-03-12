const express = require('express');
const bodyParser = require('body-parser');
const knex = require('./db/config');


const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = require('knex')(config);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.port || 5000);
app.listen(app.get('port'));

app.use('/', express.static(`${__dirname}/client/build`));

app.get('/api/v1/test', (req, res) => {
  return res.status(200).json({ status: 'success' });
});

module.exports = app;
