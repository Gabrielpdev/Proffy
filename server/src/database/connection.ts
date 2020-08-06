import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: '192.168.99.100',
    user: 'postgres',
    password: 'docker',
    database: 'Proffy',
  },
});

export default db;
