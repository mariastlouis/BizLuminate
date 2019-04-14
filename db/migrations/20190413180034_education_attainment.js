
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('educationAttainment', (table) => {
      table.increments('id').primary();
      table.integer('placeId');
      table.string('placeDisplayName');
      table.string('cityTown');
      table.string('Geography');
      table.decimal('less9th', 4, 1);
      table.decimal('9th12thnoDiploma', 4, 1);
      table.decimal('hsgrad', 4, 1);
      table.decimal('somecollege', 4, 1);
      table.decimal('associates', 4, 1);
      table.decimal('bachelors', 4, 1);
      table.decimal('graduateprofessional', 4, 1);
      table.decimal('bachelorHigher', 4, 1);

    })

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('educationAttainment')
  ]);
};
