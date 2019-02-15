const commentsRouter = require('express').Router();

const {
  sendPatchComment, deleteComment,
} = require('../controller/comments');


commentsRouter.route('/:comment_id')
  .patch(sendPatchComment)
  .delete(deleteComment);


module.exports = commentsRouter;
