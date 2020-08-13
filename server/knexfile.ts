import 'dotenv/config';
import path from 'path';

module.exports = {
  client: process.env.APP_CLIENT,
  connection: {
    host: process.env.APP_HOST,
    user: process.env.APP_USER,
    password: process.env.APP_PASSWORD,
    database: process.env.APP_DB,
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
};
