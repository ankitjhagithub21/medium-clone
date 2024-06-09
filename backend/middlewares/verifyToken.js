const jwt = require('jsonwebtoken')
const User = require('../models/user')
const verifyToken = async(req,res,next) =>{
    try{

        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                success:false,
                message:"You are not authorized."
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({
                success:false,
                message:"Unauthorized."
            })
        }

        const user = await User.findById(decoded.id).select("-password")
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid token."
            })
        }
        req.user = user
        next()

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {
    verifyToken
}