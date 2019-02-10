
exports.up = function (connection, Promise) {
  return connection.schema.increments('comments_id').primary().notNullable();
  connection.schema.string('author').references(users.username);
};

exports.down = function (connection, Promise) {
  return connection.schema.dropTable('comments');
};
