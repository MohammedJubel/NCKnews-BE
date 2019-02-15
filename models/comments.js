const connection = require('../db/connection');

exports.getCommentsByArticleId = ({
  conditions, sort_by = 'created_at', order = 'desc', limit = 10, page = 1,
}) => connection('comments')
  .select('comments.comment_id', 'comments.author', 'comments.votes', 'comments.created_at', 'comments.body')
  .join('articles', 'comments.article_id', '=', 'articles.article_id')
  .where(conditions)
  .orderBy(sort_by, order)
  .limit(limit)
  .offset((page - 1) * limit);

exports.getCommentByArticleId = newComment => connection
  .insert(newComment)
  .into('comments')
  .returning('*');
