import React, { useEffect, useState } from 'react'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../app/slices/blogSlice'

const Blogs = () => {
  const blogs = useSelector(state=>state.blogs.value)
  const dispatch = useDispatch()


  useEffect(()=>{
    const fetchBlogs = async() =>{
      try{
        const res  = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs`)
        const data = await res.json()
        if(data.success){
        dispatch(setBlogs(data.blogs))
         
        }
      }catch(error){
        console.log(error)
      }
    }
   fetchBlogs()
  },[])
  return (
    <div className='flex flex-col'>
     {
      blogs.map((blog)=>{
        return <Blog key={blog._id} blog={blog} name={blog.author.name}  profilePhoto={blog.author.profilePhoto}/>
      }).reverse()
     }
    </div>
  )
}

export default Blogs
