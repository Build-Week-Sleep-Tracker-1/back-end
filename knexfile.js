// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      min: 2,
      max: 10
    }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/sleep-test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
