exports.formatArticles = data => data.map(({ created_at, ...restOfArticle }) => ({
  created_at: new Date(created_at),
  ...restOfArticle,
}));


exports.formatComments = (data, articleRef) => data.map(({
  belongs_to, created_by, created_at, ...restOfArticle
}) => ({
  author: created_by,
  created_at: new Date(created_at),
  article_id: articleRef[belongs_to],
  ...restOfArticle,
}));

exports.createRef = (article_row, article_name, article_id) => article_row.reduce((refObj, articleObj) => {
  const articleTitle = articleObj[article_name];
  const articleID = articleObj[article_id];
  refObj[articleTitle] = articleID;
  return refObj;
}, {});
