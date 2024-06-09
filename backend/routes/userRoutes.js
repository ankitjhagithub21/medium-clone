const express = require('express')
const { verifyToken } = require('../middlewares/verifyToken')
const { getUserProfile, getAllUsers, followUnFollowUser, updateProfile } = require('../controllers/userControllers')
const userRouter = express.Router()

userRouter.get("/profile/:id",getUserProfile)
userRouter.get("/",getAllUsers)
userRouter.get("/follow/:id",verifyToken,followUnFollowUser)
userRouter.post("/update-profile",verifyToken,updateProfile)


module.exports = userRouter