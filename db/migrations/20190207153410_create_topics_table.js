
exports.up = function (connection, Promise) {
  return connection.schema.createTable('topics', (table) => {
    table.string('slug').primary().unique();
    table.string('description');
  });
};

exports.down = function (connection, Promise) {
  return connection.schema.dropTable('topics');
};
