exports.up = function(knex) {
  return knex.schema
    .createTable('themes', table => {
      table.increments('id').primary();
      table
        .string('name')
        .notNull()
        .unique();
      table
        .integer('course_id')
        .unsigned()
        .notNull();
      table
        .foreign('course_id')
        .references('id')
        .inTable('courses_table');
    })
    .then(function() {
      return knex('themes').insert([
        { id: 1, name: 'Python', course_id: 1 },
        { id: 2, name: 'React Native', course_id: 1 },
        { id: 3, name: 'Flutter', course_id: 1 },
        { id: 4, name: 'ReactJS', course_id: 1 },
        { id: 5, name: 'SQL', course_id: 1 },
        { id: 6, name: 'Java', course_id: 1 },
        { id: 7, name: 'JavaScript', course_id: 1 },
        { id: 8, name: 'NodeJS', course_id: 1 },
        { id: 9, name: 'Html', course_id: 1 },
        { id: 10, name: 'Css', course_id: 1 }
      ]);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('themes');
};
