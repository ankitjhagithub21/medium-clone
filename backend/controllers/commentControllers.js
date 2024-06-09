const Blog = require("../models/blog")
const Comment = require("../models/comment")

const addComment = async (req, res) => {
    try {

        const blogId = req.params.blogId
        const user = req.user
        const { content } = req.body;

        if (!content || content.length == 0) {
            return res.status(400).json({
                success: false,
                message: "Comment not foumd."
            })
        }
        const blog = await Blog.findById(blogId)

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found."
            })
        }
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "You are not authorized."
            })
        }

        const newComment = new Comment({
            content,
            userId: user._id,
            blogId
        })

        await newComment.save()
        blog.comments.push(newComment)
        await blog.save()
        res.status(201).json({
            success: true,
            message: "Comment added."
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const deleteComment = async (req, res) => {
    try {


        const user = req.user
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "You are not authorized."
            })
        }


        const { blogId, commentId } = req.params
        const blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "blog not found."
            })
        }
        const commentIndex = blog.comments.findIndex((comment) => comment._id == commentId)

        if (commentIndex != -1) {
            blog.comments.splice(commentIndex, 1)
            await blog.save()
        }

        const comment = await Comment.findOne({ _id: commentId, userId: user._id })

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found or you can not delete this comment."
            })
        }


        await Comment.findByIdAndDelete(commentId)



        res.status(200).json({
            success: true,
            message: "Comment deleted."
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    addComment,
    deleteComment
}