
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('countyUnemployment', (table) => {
      table.integer('countyId').alter();
      table.string('countyName').alter();
      table.integer('Rank').alter();
      table.decimal("UnemploymentRate", 4, 1).alter();
    })
  ])
};

exports.down = function(knex, Promise) {
  knex.schema.table('countyUnemployment', (table) => {
    table.integer('countyId').alter();
    table.string('countyName').alter();
    table.integer('Rank').alter();
    table.string('UnemploymentRate').alter();
  })
};
