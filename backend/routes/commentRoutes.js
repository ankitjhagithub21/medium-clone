const express = require('express')
const { addComment, deleteComment, getComments } = require('../controllers/commentControllers')
const { verifyToken } = require('../middlewares/verifyToken');

const commentRouter = express.Router()

commentRouter.post("/add/:blogId",verifyToken,addComment)
commentRouter.delete("/:blogId/delete/:commentId",verifyToken,deleteComment)
commentRouter.get("/:blogId",getComments)


module.exports = commentRouter