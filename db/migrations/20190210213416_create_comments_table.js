
exports.up = function (connection, Promise) {
  console.log('creating comments table....');
  return connection.schema.createTable('comments', (table) => {
    table.increments('comment_id').primary();
    table.string('author').references('users.username');
    table.integer('article_id').notNullable();
    table.integer('votes').defaultTo(0);
    table.datetime('created_at').defaultTo(connection.fn.now());
    table.text('body');
  });
};


exports.down = function (connection, Promise) {
  return connection.schema.dropTable('comments');
};
