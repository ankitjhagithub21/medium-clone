import React from 'react'

const Topics = () => {
    const topics = [
        'Website',
        'Following',
        'Sports',
        'Technology',
        'Education',
        'Gaming',
        'Travel'
    ]
  return (
    <div className='flex overflow-auto border-b p-2 items-center gap-10 mb-10'>
      {
        topics.map((topic,index)=>{
            return <span key={index} className='text-gray-600 hover:text-black cursor-pointer'>{topic}</span>
        })
      }
    </div>
  )
}

export default Topics
