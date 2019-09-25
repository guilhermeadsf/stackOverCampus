exports.up = async function(knex) {
  return await knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('nome').notNull();
    table
      .string('email')
      .notNull()
      .unique();
    table.string('senha', 60);
    table
      .boolean('ativo')
      .notNull()
      .defaultTo(true);
    table.timestamp('data_criacao').defaultTo(knex.fn.now());
    table.integer('curso_id').unsigned();
    table
      .foreign('curso_id')
      .references('id')
      .inTable('courses_table');
  });
};

exports.down = function(knex) {};
