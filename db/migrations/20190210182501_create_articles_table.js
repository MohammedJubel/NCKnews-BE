
exports.up = function (connection, Promise) {
  connection.schema.createTable('articles', (table) => {
    table.increments().primary().unique().nullable();
    table.string('name');
    table.timestamps();
  });
};

exports.down = function (connection, Promise) {
  connection.schema.dropTable('articles');
};
