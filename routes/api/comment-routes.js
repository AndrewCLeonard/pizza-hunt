const router = require("express").Router();
const { addComment, removeComment, addReply, removeReply } = require("../../controllers/comment-controller");

// /api/comments/<pizzaId>
router.route("/:pizzaId").post(addComment);

// deleting comment requires two parameters:
// 1. delete the comment
// 2. find which pizza that comment originated from

// /api/comments/<pizzaId>/<commentId>
router
	.route("/:pizzaId/:commentId")
	.put(addReply) //CONTROLLER FUNCTION MUST BE CONNECTED TO ROUTER ???
	.delete(removeComment);

// /api/comments/<pizzaId>/<commentId>/<replyId>
router.route("/:pizzaId/:commentId/:replyId").delete(removeReply);

module.exports = router;
