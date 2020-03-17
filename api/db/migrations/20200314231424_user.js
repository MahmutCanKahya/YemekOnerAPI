exports.up = function(knex) {
  return Promise.all([
        knex.schema.createTable('users', function (table) {
            table.increments('id').primary();
            table.string('email').unique();
            table.string('username').unique();
            table.string('password');
        })
    ]);
};

exports.down = function(knex) {
  return knex.schema.dropTable('user')
};
