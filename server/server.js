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
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.set('port', process.env.port || 5000);
app.listen(app.get('port'));
app.use('/', express_1.default.static(__dirname + "/client/build"));
app.get('/api/v1/test', function (req, res) {
    return res.status(200).json({ status: 'success' });
});
module.exports = app;
