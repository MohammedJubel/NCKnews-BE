
exports.up = function (connection, Promise) {
  // console.log('creating topics table....');
  return connection.schema.createTable('topics', (table) => {
    table.string('slug').primary().unique().notNullable();
    table.string('description').notNullable();
  });
};

exports.down = function (connection, Promise) {
  return connection.schema.dropTable('topics');
};
