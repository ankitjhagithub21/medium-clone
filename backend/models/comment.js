const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    blogId:{type:Schema.Types.ObjectId, ref:'Blog',required:true}
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
