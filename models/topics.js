const connection = require('../db/connection');

exports.fetchTopics = () => connection
  .select('*')
  .from('topics');

exports.insertTopic = newTopic => connection
  .insert(newTopic)
  .into('topics')
  .returning('*');
