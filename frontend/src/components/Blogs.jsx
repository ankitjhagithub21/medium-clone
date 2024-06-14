import React, { useEffect, useState } from 'react'
import Blog from './Blog'

const Blogs = () => {
  const [blogs,setBlogs] = useState([])

  useEffect(()=>{
    const fetchBlogs = async() =>{
      try{
        const res  = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs`)
        const data = await res.json()
        if(data.success){
          setBlogs(data.blogs)
         
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
      })
     }
    </div>
  )
}

export default Blogs
