const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true, unique:true },
    username: { type: String, required: true },
    password: { type: String, required:true },
    bio:{
        type:String,
    },
    profilePhoto:{
        type:String,
        required:true,
        default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
    following:[
        { type: Schema.Types.ObjectId, ref: 'User' }
    ],
    followers:[
        { type: Schema.Types.ObjectId, ref: 'User' }
    ]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
