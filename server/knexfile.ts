import path from 'path';

module.exports = {
  client: process.env.APP_CLIENT,
  connection: {
    host: process.env.APP_HOST,
    user: process.env.APP_USER,
    password: process.env.APP_CLIENT,
    database: process.env.APP_CLIENT,
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
};
