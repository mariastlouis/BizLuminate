const countyLookups = require('../../../data/countyLookup');
const placeLookups = require('../../../data/placeLookup');
const bachelorDegreeTypes = require('../../../data/bachelorDegreeTypes');
const countyUnemployment = require('../../../data/countyUnemployment');
const generalDemographics = require('../../../data/generalDemographics');
const transportationWork = require('../../../data/transportationWork');

exports.seed = function(knex, Promise) {
  return Promise.all([
      knex('countyLookup').del()
        .then(function () {
            return knex('countyLookup').insert(countyLookups);
        }),
        knex('placeLookup').del()
            .then(function () {
                return knex('placeLookup').insert(placeLookups);
            }),
        knex('bachelorDegreeTypes').del()
            .then(function () {
                return knex('bachelorDegreeTypes').insert(bachelorDegreeTypes);
            }),
        knex('countyUnemployment').del()
            .then(function () {
                return knex('countyUnemployment').insert(countyUnemployment);
            }),
        knex('generalDemographics').del()
            .then(function () {
                return knex('generalDemographics').insert(generalDemographics);
            }),
        knex('transportationWork').del()
            .then(function () {
                return knex('transportationWork').insert(transportationWork);
            })
      ])
}
