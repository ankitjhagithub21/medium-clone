const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const { uploadBlog, deleteBlog, updateBlog, getAllBlogs, getSingleBlog, likeUnlikeBlog } = require('../controllers/blogControllers');
const blogRouter = express.Router();



blogRouter.post("/upload", verifyToken,uploadBlog);

blogRouter.delete("/delete/:id", verifyToken,  deleteBlog);
blogRouter.put("/update/:id", verifyToken, updateBlog);
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getSingleBlog);
blogRouter.post("/like/:id", verifyToken,likeUnlikeBlog);

module.exports = blogRouter;
