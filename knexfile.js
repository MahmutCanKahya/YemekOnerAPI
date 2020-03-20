
module.exports = {

  development: {
    client: 'postgresql',
    useNullAsDefault: true,
    connection: {
      database: 'yemekoner',
      user: "admin",
      password: "774516",
    },
    migrations: {
      directory: __dirname + '/api/db/migrations',
    },
    seeds: {
      directory: __dirname + '/api/db/seeds',
    },
  },
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
    migrations: {
      directory: __dirname + '/api/db/migrations',
    },
    seeds: {
      directory: __dirname + '/api/db/seeds',
    },
  },
}