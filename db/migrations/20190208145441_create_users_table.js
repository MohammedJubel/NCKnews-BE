
exports.up = function (connection, Promise) {
  return connection.schema.createTable('users', (table) => {
    table.string('username').primary().unique().notNullable();
    table.string('avatar_url').notNullable();
    table.string('name').notNullable();
  });
};

exports.down = function (connection, Promise) {
  connection.schema.dropTable('users');
};
