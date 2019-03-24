
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('placeLookup', (table) => {
          table.increments('id').primary();
          table.integer('placeId');
          table.integer('placeShortId');
          table.string('placeCensusName');
          table.string('placeDisplayName');
          table.string('cityTown');
          table.string('multipleCounties');
          table.string('countyName');
          table.integer('countyShortId');
          table.integer('countyId');
          table.string('county2Name');
          table.integer('county2ShortId');
          table.integer('county2Id');
          table.string('county3Name');
          table.integer('county3ShortId');
          table.integer('county3Id');
      }),
      knex.schema.createTable('countyLookup', (table) => {
          table.increments('id').primary();
          table.string('countyName');
          table.integer('countyId');
          table.integer('countyShortId');
      }),
      knex.schema.createTable('generalDemographics', (table) => {
          table.increments('id').primary();
          table.integer('placeId');
          table.string('placeDisplayName');
          table.string('cityTown');
          table.string('Id');
          table.integer('Id2');
          table.integer('totalpop');
          table.integer('medianAge');
          table.integer('totalHousehold');
          table.integer('medianIncomeDollars');
      }),
      knex.schema.createTable('transportationWork', (table) => {
          table.increments('id').primary();
          table.integer('placeId');
          table.string('placeDisplayName');
          table.string('cityTown');
          table.string('Id');
          table.integer('Id2');
          table.string('Geography');
          table.integer('totalWorkers16older');
          table.integer('pctCarTruckVanAlone');
          table.integer('pctCarTruckVanCarpooled');
          table.integer('pctPublicTransportation');
          table.integer('pctWalked');
          table.integer('pctBicycle');
          table.integer('pctTaxiMotorcycle');
          table.integer('pctWorkedAtHome');
          table.integer('meanTravelTimeWork');
      }),
      knex.schema.createTable('countyUnemployment', (table) => {
          table.increments('id').primary();
          table.integer('countyId');
          table.string('countyName');
          table.integer('Rank');
          table.string('UnemploymentRate');
      }),
      knex.schema.createTable('bachelorDegreeTypes', (table) => {
          table.increments('id').primary();
          table.integer('placeId');
          table.string('placeName');
          table.string('placeGeoId');
          table.string('censusName');
          table.integer('totalBachelorDegree');
          table.integer('totalScienceEngineering');
          table.integer('pctScienceEngineering');
          table.integer('totalScienceEngineeringRelated');
          table.integer('pctScienceEngineeringRelated');
          table.integer('totalBusiness');
          table.integer('pctBusiness');
          table.integer('totalEducation');
          table.integer('pctEducation');
          table.integer('totalArtsHumanities');
          table.integer('pctArtsHumanities');
      })
  ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('placeLookup'),
        knex.schema.dropTable('countyLookup'),
        knex.schema.dropTable('generalDemographics'),
        knex.schema.dropTable('transportationWork'),
        knex.schema.dropTable('countyUnemployment'),
        knex.schema.dropTable('bachelorDegreeTypes')
    ]);
};