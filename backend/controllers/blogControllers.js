const Blog = require("../models/blog");


const uploadBlog = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized."
            });
        }

        const { user } = req;
        const { title, content, topic, thumbnail } = req.body;

        if (!title || !content || !topic) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const blogData = {
            title,
            content,
            topic,
            author: user._id
        };

        if (thumbnail) {
            blogData.thumbnail = thumbnail;
        }

        const newBlog = new Blog(blogData);
        await newBlog.save();

        user.blogs.push(newBlog._id);
        await user.save();

        return res.status(201).json({
            success: true,
            message: "Blog uploaded.",
            newBlog
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};



const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized."
            });
        }

        const blogIndex = user.blogs.findIndex((blog) => blog._id == blogId);

        if (blogIndex == -1) {
            return res.status(404).json({
                success: false,
                message: "Blog not found or you can't delete it."
            });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found."
            });
        }

       

        await Blog.findByIdAndDelete(blogId);

        user.blogs.splice(blogIndex, 1);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Blog deleted."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const { title, content } = req.body;
        
        const user = req.user;


        
        if (!title || !content) {
            return res.status(401).json({
                success: false,
                message: "All fields are required."
            });
        }

        const blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found."
            });
        }
       
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized."
            });
        }

      


        blog.title = title
        blog.content = content

        await blog.save()

        res.status(200).json({
            success: true,
            message: "Blog updated"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate('author', 'name profilePhoto bio') 
        if (!blogs) {
            return res.status(404).json({
                success: false,
                message: "Blog not found."
            })
        }
        res.status(200).json({
            success: true,
            blogs
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const getSingleBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId).populate('author','name profilePhoto');

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found."
            });
        }
        
        res.status(200).json({
            success: true,
            blog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const likeUnlikeBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.user._id;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found."
            });
        }

        const likeIndex = blog.likes.indexOf(userId);

        if (likeIndex === -1) {
            blog.likes.push(userId);
            await blog.save();

            return res.status(200).json({
                success: true,
                message: "Blog liked."
            });
        } else {
            blog.likes.splice(likeIndex, 1);
            await blog.save();

            return res.status(200).json({
                success: true,
                message: "Blog unliked."
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    uploadBlog,
    deleteBlog,
    updateBlog,
    getAllBlogs,
    getSingleBlog,
    likeUnlikeBlog
}

