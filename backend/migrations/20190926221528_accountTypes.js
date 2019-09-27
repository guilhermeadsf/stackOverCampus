exports.up = async function(knex) {
  return await knex.schema
    .createTable('account_types', table => {
      table.increments('id').primary();
      table
        .string('nome')
        .notNull()
        .unique();
    })
    .then(function() {
      return knex('account_types').insert([
        { id: 1, nome: 'Admin' },
        { id: 2, nome: 'Comum' }
      ]);
    });
};

exports.down = async function(knex) {
  return await knex.schema.dropTable('account_types');
};
