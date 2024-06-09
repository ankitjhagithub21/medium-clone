const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const register = async(req,res) =>{
    try{
        const {name,username,password} = req.body;

        if(!name || !username || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }

        const user = await User.findOne({username})
        
        if(user){
            return res.status(400).json({
                success:false,
                message:"Username already exist."
            })
        }

        const securePassword = await bcrypt.hash(password,10)

        const newUser = new User({
            name,
            username,
            password:securePassword
        })

        await newUser.save()

        res.status(201).json({
            success:true,
            message:"Account created successfully."
        })



    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
const login = async(req,res) =>{
    try{

        const {username,password} = req.body;

        if(!username || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }


        const user = await User.findOne({username})
        
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Wrong username or password."
            })    
        }

        const comparePassword = await bcrypt.compare(password,user.password)

        if(!comparePassword){
            return res.status(404).json({
                success:false,
                message:"Wrong username or password."
            })
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})

        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            expires:new Date(Date.now()+ 1*24*60*60*1000)
        }).status(200).json({
            success:true,
            message:"Login successfull."
        })
        
        
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const logout = async(req,res) =>{
    try{
        res.cookie('token','',{
            expires:new Date(0)
        }).status(200).json({
            success:true,
            message:"Logout successfull."
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getUser = async(req,res) =>{
    try{
        if(!req.user){
            return res.status(404).json({
                success:false,
                message:"user not found."
            })
        }
        res.status(200).json({
            success:true,
            user:req.user
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports ={
    register,
    login,
    logout,
    getUser
}