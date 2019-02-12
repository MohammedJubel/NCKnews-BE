const connection = require('../db/connection');


// SELECT articles.article_id, COUNT(comments.comment_id) AS comment_count
// FROM articles
// LEFT JOIN comments ON comments.article_id = articles.article_id
// GROUP BY articles.article_id;


exports.fetchArticles = () => connection
  .select('articles.*')
  .from('articles')
  .leftJoin('comments', 'comments.article_id', 'articles.article_id')
  .groupBy('articles.article_id')
  .count('comments.comment_id as comment_count');
