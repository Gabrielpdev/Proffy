import path from 'path';

module.exports = {
  client: 'pg',
  connection: {
    host: '192.168.99.100',
    user: 'postgres',
    password: 'docker',
    database: 'Proffy',
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
};
