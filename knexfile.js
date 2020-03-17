
module.exports = {

    development: {
      client: 'pg',
      useNullAsDefault: true,
      connection: {
        database: 'deneme',
        user: "postgres",
        password: "mahmut7716",
      },
      migrations: {
        directory: __dirname+ '/api/db/migrations',
      },
      seeds: {
        directory: __dirname+ '/api/db/seeds',
      },
    },/*
    staging: {
      client: 'postgresql',
      connection: {
        database: 'deneme',
        user: "postgres",
        password: "mahmut7716",
      },
      pool: {
        min: 2,
        max: 10
      },
    },*/
  }