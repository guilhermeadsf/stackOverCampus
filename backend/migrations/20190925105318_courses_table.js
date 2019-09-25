exports.up = async function(knex) {
  return await knex.schema.createTable('courses_table', table => {
    table.increments('id');
    table
      .string('nome')
      .notNull()
      .unique();
  });
};

exports.down = async function(knex) {
  return await knex.schema.dropTable('courses_table');
};
