const {
  articleData, commentData, topicData, userData,
} = require('../data');

const { formatArticles } = require('../utils');


exports.seed = (knex, Promise) => knex.migrate
  .rollback()
  .then(() => knex.migrate.latest())
  .then(() => knex.insert(topicData).into('topics'))
  .then(() => knex.insert(userData).into('users'))
  .then(() => {
    const formattedArticles = formatArticles(articleData);
    return knex.insert(formattedArticles).into('articles');
  })
  .then(() => knex.insert(commentData).into('comments'));
// .then(() => knex.insert(articleData).into('articles'));


console.log(commentData);//   console.log;
