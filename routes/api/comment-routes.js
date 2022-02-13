const router = require("express").Router();
const { addComment, removeComment } = require("../../controllers/comment-controller");

// /api/comments/<pizzaId>
router.route("/:pizzaId").post(addComment);

// deleting comment requires two parameters:
// 1. delete the comment
// 2. find which pizza that comment originated from

// /api/comments/<pizzaId>/<commentId>
router.route("/:pizzaId/:commentId").delete(removeComment);

module.exports = router;
