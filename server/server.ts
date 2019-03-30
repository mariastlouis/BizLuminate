import express from 'express';
import bodyParser from 'body-parser';
import Place from './api-objects/Place';

import { any } from 'bluebird';
// import knex from './db/config';


const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];
const database = require('knex')(config);
const app: express.Application = express();
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use('/', express.static(`${__dirname}/client/build`));

app.get('/api/v1/test', (req, res) => {
  return res.status(200).json({ status: 'success' });
});

app.get('/api/v1/places', (request, response) => {
  database('placeLookup').select()
    .then((places: any) => {
      return response.status(200).json({
        places
      });
    })
    .catch((error: any) => {
      return response.status(500).json({
        error
      });
    });
});



module.exports = app;
