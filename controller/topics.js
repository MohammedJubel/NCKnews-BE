const {
  fetchTopics, insertTopic,
} = require('../models/topics');

exports.getTopics = (req, res, next) => fetchTopics()
  .then((topics) => {
    res.status(200).send({ topics });
  })
  .catch(next);

exports.addTopics = (req, res, next) => {
  const newTopic = req.body;

  insertTopic(newTopic)
    .then(([topic]) => {
      res.status(201).send({ topic });
    })
    .catch(next);
};
