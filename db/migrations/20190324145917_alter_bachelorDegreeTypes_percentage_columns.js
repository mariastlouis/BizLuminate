exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.table('bachelorDegreeTypes', (table) => {
            table.decimal('pctScienceEngineering', 4, 1).alter();
            table.decimal('pctScienceEngineeringRelated', 4, 1).alter();
            table.decimal('pctBusiness', 4, 1).alter();
            table.decimal('pctEducation', 4, 1).alter();
            table.decimal('pctArtsHumanities', 4, 1).alter();
        })
    ])
};

exports.down = function (knex, Promise) {
    knex.schema.table('bachelorDegreeTypes', (table) => {
        table.integer('pctScienceEngineering').alter();
        table.integer('pctScienceEngineeringRelated').alter();
        table.integer('pctBusiness').alter();
        table.integer('pctEducation').alter();
        table.integer('pctArtsHumanities').alter();
    })
};
