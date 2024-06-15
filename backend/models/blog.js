const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    thumbnail: { type: String },
    topic:{
        type:String,required:true
    },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [
        {
            type: Schema.Types.ObjectId, ref: 'Comment',
        }
    ],
    likes:[
        { type: Schema.Types.ObjectId, ref: 'User' },
    ],
    createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
