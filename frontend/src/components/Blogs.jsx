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
    <div className='flex flex-col gap-10'>
     {
      blogs.map((blog)=>{
        return <Blog key={blog._id} blog={blog}/>
      })
     }
    </div>
  )
}

export default Blogs
