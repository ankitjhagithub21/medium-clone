const User = require("../models/user")
const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
         
        const user = await User.findById(userId)
            .select("-password")
            .populate("blogs"); 

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }
        
        res.status(200).json({
            success: true,
            message: "User found.",
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const getAllUsers = async(req,res) =>{
    try{
        const users = await User.find({}).select("-password")
        if(!users){
            res.status(404).json({
                success: false,
                message: "User not found."
            })
        }
        res.status(200).json({
            success: true,
            users
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const followUnFollowUser = async (req, res) => {
    try {
        const followedUserId = req.params.id;
        const followingUser = req.user;

        if (!followingUser) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized."
            });
        }

        const followedUser = await User.findById(followedUserId);

        if (!followedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const followingIndex = followingUser.following.findIndex(userId => userId == followedUserId);
        const followerIndex = followedUser.followers.findIndex(userId => userId == followingUser._id);

        if (followingIndex === -1) {
            followingUser.following.push(followedUserId);
            followedUser.followers.push(followingUser._id);
            await followingUser.save();
            await followedUser.save();

            return res.status(200).json({
                success: true,
                message: `You are now following ${followedUser.name}.`
            });
        } else {
            followingUser.following.splice(followingIndex, 1);
            followedUser.followers.splice(followerIndex, 1);
            await followingUser.save();
            await followedUser.save();

            return res.status(200).json({
                success: true,
                message: `You have unfollowed ${followedUser.name}.`
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const updateProfile = async(req,res) =>{
    try{
        const user = req.user
        if(!user){
            return res.status(401).json({
                success: false,
                message: "You are not authorized."
            });
        }
        const {name,bio,profilePhoto} = req.body;

        if(!name){
            return res.status(400).json({
                success: false,
                message: "name is required."
            });
        }
        user.name = name
        user.bio = bio
        if(profilePhoto){
            user.profilePhoto = profilePhoto
        }
        

        await user.save()

         res.status(200).json({
            success: true,
            message:"Profile updated.",
            user
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


module.exports = {
    getUserProfile,
    getAllUsers,
    followUnFollowUser,
    updateProfile
}