const express = require('express');
const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = require('knex')(config);
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use('/', express.static(`${__dirname}/client/build`));

app.get('/api/v1/test', (req, res) => {
  return res.status(200).json({ status: 'success' });
});

app.get('/api/v1/places', function (request, response) {
  database('placeLookup').select()
      .then(function (places) {
      return response.status(200).json({
          places: places
      });
  })
      .catch(function (error) {
      return response.status(500).json({
          error: error
      });
  });
});

app.get('/api/v1/places/:countyId', function (req, res) {
  var countyId = req.params.countyId;
  return database('placeLookup').where("countyId", countyId)
      .then(function (places) {
      return res.status(200).json({ places: places });
  })
      .catch(function (err) {
      return res.status(500).json({ error: "Error while fetching places by county id. -> " + err });
  });
});

