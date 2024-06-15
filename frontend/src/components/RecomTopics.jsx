import React from 'react'
import { useSelector } from 'react-redux'

const RecomTopics = () => {
  const blogs = useSelector(state=>state.blogs.value)
    const topics = blogs.map((blog)=>blog.topic)
  return (
    <div>
        <h2 className='font-bold text-lg mb-5'>Topics</h2>
         <div className='flex gap-2 flex-wrap items-center'>
      {
        topics.map((topic,index)=>{
            return <div key={index} className='rounded-full text-sm px-4 py-2 cursor-pointer bg-gray-100'>{topic}</div>
        })
      }
    </div>
    </div>
  )
}

export default RecomTopics
