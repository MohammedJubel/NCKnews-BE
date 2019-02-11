const {
  articleData, commentData, topicData, userData,
} = require('../data');

const { formatArticles, formatComments, createRef } = require('../utils');


exports.seed = (knex, Promise) => knex.migrate
  .rollback()
  .then(() => knex.migrate.latest())
  .then(() => knex.insert(topicData).into('topics'))
  .then(() => knex.insert(userData).into('users'))
  .then(() => {
    const formattedArticles = formatArticles(articleData);
    return knex.insert(formattedArticles).into('articles').returning('*');
  })
  .then((articleRows) => {
    const articleRef = createRef(articleRows, 'title', 'article_id');
    // console.log(articleRef);
    const formattedComments = formatComments(commentData, articleRef);
    return knex('comments')
      .insert(formattedComments);

    // console.log(formattedComments);
  });
