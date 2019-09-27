exports.up = async function(knex) {
  return await knex.schema
    .createTable('courses_table', table => {
      table.increments('id').primary();
      table
        .string('nome')
        .notNull()
        .unique();
    })
    .then(function() {
      return knex('courses_table').insert([
        { id: 1, nome: 'Sistemas de Informação' },
        { id: 2, nome: 'Bacharelado em Ciência e Tecnologia de Alimentos' },
        { id: 3, nome: 'Licenciatura em Química ' }
      ]);
    });
};

exports.down = async function(knex) {
  return await knex.schema.dropTable('courses_table');
};
