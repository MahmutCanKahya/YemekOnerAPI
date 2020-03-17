
exports.up = function (knex) {
    return knex.schema.createTable("restaurant", (table) => {
        table.increments('id').primary();
        table.uuid('row_guid');
        table.string("name");
        table.decimal('latitude', 9, 6)
        table.decimal('longitude', 9, 6)
    }).then(() => {
        console.log("Restaurant table is created")
    });
};


exports.down = function (knex) {
    return knex.schema.dropTable("restaurant")
        .then(() => {
            console.log("Restaurant table is droped")
        });
};
