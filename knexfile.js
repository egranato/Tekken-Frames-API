require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
  },
  production: {
    client: "postgresql",
    connection: {
      server: process.env.AZURE_POSTGRESQL_HOST,
      user: process.env.AZURE_POSTGRESQL_USER,
      password: process.env.AZURE_POSTGRESQL_PASSWORD,
      options: {
        port: process.env.AZURE_POSTGRESQL_PORT,
        database: process.env.AZURE_POSTGRESQL_DATABASE,
        encrypt: true,
      },
    },
  },
};
