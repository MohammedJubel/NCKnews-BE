const commentsRouter = require('express').Router();

const {
  sendPatchComment, deleteComment,
} = require('../controller/comments');
const { handle405 } = require('../errors');

commentsRouter.route('/:comment_id')
  .patch(sendPatchComment)
  .delete(deleteComment)
  .all(handle405);


module.exports = commentsRouter;
