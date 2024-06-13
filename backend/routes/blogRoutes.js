const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const { uploadBlog, deleteBlog, updateBlog, getAllBlogs, getSingleBlog, likeUnlikeBlog } = require('../controllers/blogControllers');
const blogRouter = express.Router();
const upload = require("../config/multer-config")


blogRouter.post("/upload", verifyToken, upload.single('thumbnail'),uploadBlog);

blogRouter.delete("/delete/:id", verifyToken,  deleteBlog);
blogRouter.put("/update/:id", verifyToken, updateBlog);
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getSingleBlog);
blogRouter.post("/like/:id", verifyToken,likeUnlikeBlog);

module.exports = blogRouter;
