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

app.get('/api/v1/unemployment', function (request, response) {
  database('countyUnemployment').select()
      .then(function (counties) {
      return response.status(200).json({
          counties: counties
      });
  })
      .catch(function (error) {
      return response.status(500).json({
          error: error
      });
  });
});

app.get('/api/v1/demographics', function (request, response) {
  database('generalDemographics').select()
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

app.get('/api/v1/demographics/:placeId', function (req, res) {
    var placeId = req.params.placeId;
    return database('generalDemographics').where("placeId", placeId)
        .then(function (places) {
        return res.status(200).json({ places: places });
    })
        .catch(function (err) {
        return res.status(500).json({ error: "Error while fetching places by county id. -> " + err });
    });
  });

  app.get('/api/v1/education', function (request, response) {
    database('educationAttainment').select()
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

  app.get('/api/v1/education/:placeId', function (req, res) {
    var placeId = req.params.placeId;
    return database('educationAttainment').where("placeId", placeId)
        .then(function (places) {
        return res.status(200).json({ places: places });
    })
        .catch(function (err) {
        return res.status(500).json({ error: "Error while fetching places by county id. -> " + err });
    });
  });

  app.get('/api/v1/degrees', function (request, response) {
    database('bachelorDegreeTypes').select()
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

  app.get('/api/v1/degrees/:placeId', function (req, res) {
    var placeId = req.params.placeId;
    return database('bachelorDegreeTypes').where("placeId", placeId)
        .then(function (places) {
        return res.status(200).json({ places: places });
    })
        .catch(function (err) {
        return res.status(500).json({ error: "Error while fetching places by county id. -> " + err });
    });
  });

  app.get('/api/v1/transportation', function (request, response) {
    database('transportationWork').select()
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

  app.get('/api/v1/transportation/:placeId', function (req, res) {
    var placeId = req.params.placeId;
    return database('transportationWork').where("placeId", placeId)
        .then(function (places) {
        return res.status(200).json({ places: places });
    })
        .catch(function (err) {
        return res.status(500).json({ error: "Error while fetching places by county id. -> " + err });
    });
  });




