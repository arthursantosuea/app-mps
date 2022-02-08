const express = require("express");
const { validateToken } = require("../middlewares/AuthMiddleware");
const router = express.Router();
const { Comments } = require("../models");

router.get("/:postId", async (request, response) => {
  const postId = request.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  response.json(comments);
});
router.post("/", validateToken, async (request, response) => {
  const comment = request.body;
  const username = request.user.username;
  comment.username = username;
  await Comments.create(comment);
  response.json(comment);
});
router.delete("/:commentId", validateToken, async (request, response) => {
  const commentId = request.params.commentId;
  await Comments.destroy({
    where: {
      id: commentId,
    },
  });
  response.json("DELETED SUCCESSFULLY");
});
module.exports = router;
