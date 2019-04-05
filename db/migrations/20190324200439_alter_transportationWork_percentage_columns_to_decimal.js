exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.table('transportationWork', (table) => {
            table.decimal('pctCarTruckVanAlone', 4, 1).alter();
            table.decimal('pctCarTruckVanCarpooled', 4, 1).alter();
            table.decimal('pctPublicTransportation', 4, 1).alter();
            table.decimal('pctWalked', 4, 1).alter();
            table.decimal('pctBicycle', 4, 1).alter();
            table.decimal('pctTaxiMotorcycle', 4, 1).alter();
            table.decimal('pctWorkedAtHome', 4, 1).alter();
            table.decimal('meanTravelTimeWork', 4, 1).alter();
        })
    ])
};

exports.down = function (knex, Promise) {
    knex.schema.table('transportationWork', (table) => {
        table.integer('pctCarTruckVanAlone').alter();
        table.integer('pctCarTruckVanCarpooled').alter();
        table.integer('pctPublicTransportation').alter();
        table.integer('pctWalked').alter();
        table.integer('pctBicycle').alter();
        table.integer('pctTaxiMotorcycle').alter();
        table.integer('pctWorkedAtHome').alter();
        table.integer('meanTravelTimeWork').alter();
    })
};
