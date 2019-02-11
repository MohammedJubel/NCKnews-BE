const connection = require('../db/connection');

exports.fetchTopics = () => connection
  .select('*')
  .from('topics');
