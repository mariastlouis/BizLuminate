"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
// import knex from './db/config';
var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile')[environment];
var database = require('knex')(config);
var app = express_1.default();
var path = require('path');
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
var port = process.env.PORT || 5000;
app.listen(port, function () { return console.log("Listening on port " + port); });
app.use('/', express_1.default.static(__dirname + "/client/build"));
app.get('/api/v1/test', function (req, res) {
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
module.exports = app;
