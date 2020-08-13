import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('favorites', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.uuid('user_id').notNullable();
    table
      .uuid('proffy_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('favorites');
}
