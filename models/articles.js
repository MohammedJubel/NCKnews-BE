const connection = require('../db/connection');


// SELECT articles.article_id, COUNT(comments.comment_id) AS comment_count
// FROM articles
// LEFT JOIN comments ON comments.article_id = articles.article_id
// GROUP BY articles.article_id;


exports.getArticles = (conditions, sort_by = 'created_at', order = 'desc', limit = 10, page = 1) => connection
  .select('articles.*')
  .from('articles')
  .leftJoin('comments', 'comments.article_id', 'articles.article_id')
  .groupBy('articles.article_id')
  .count('comments.comment_id as comment_count')
  .where(conditions)
  .orderBy(sort_by, order)
  .limit(limit);
// .offset(page, limit)

exports.insertArticle = newArticle => connection
  .insert(newArticle)
  .into('articles')
  .returning('*');


exports.getArticleById = ({ conditions }) => console.log(conditions)
  || connection.select('*')
    .from('articles')
    .where(conditions);
