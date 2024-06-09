require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDb = require('./config/db')
const authRouter = require('./routes/authRoutes')
const blogRouter = require('./routes/blogRoutes')
const userRouter = require('./routes/userRoutes')
const commentRouter = require('./routes/commentRoutes')
const app = express()
const port = process.env.PORT || 3000


connectDb()
app.use(express.json())
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}))
app.use(cookieParser())


app.use('/uploads', express.static('./uploads'));

app.use("/api/auth",authRouter)
app.use("/api/blogs",blogRouter)
app.use("/api/user",userRouter)
app.use("/api/comment",commentRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})