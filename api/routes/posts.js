const router = require("express").Router();
const { verify } = require("../middlewares/verifyToken");
const { createPost, updatePost, deletePost, likeAndUnlike, getAPost, timeline, addComment, unComment } = require("../controllers/postController");

//create a post
router.post("/",verify,createPost);

//update a post

router.put("/:id", verify,updatePost);

//delete a post

router.delete("/:id", verify,deletePost);

//like / dislike a post

router.put("/:id/like",verify, likeAndUnlike);

//get a post

router.get("/:id", getAPost);

//get timeline posts

router.get("/timeline/all",verify, timeline);

//comment

router.put("/:id/comment",verify, addComment);

//uncomment

router.put("/:id/unComment",verify, unComment);



module.exports = router;
