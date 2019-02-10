
exports.up = function (connection, Promise) {
  return connection.schema.createTable('users', (table) => {
    table.string('username').primary().unique();
    table.string('avatar_url').nullable();
    table.string('name').nullable();
  });
};

exports.down = function (connection, Promise) {
  connection.schema.dropTable('users');
};
