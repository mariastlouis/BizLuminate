exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.table('generalDemographics', (table) => {
            table.decimal('medianAge', 4, 1).alter();
        })
    ])
};

exports.down = function (knex, Promise) {
    knex.schema.table('bachelorDegreeTypes', (table) => {
        table.integer('medianAge').alter();
    })
};
