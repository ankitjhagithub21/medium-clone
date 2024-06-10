import React from 'react'

const RecomTopics = () => {
    const topics = [
        "Data Science",
        "Self Improvement",
        "Writing",
        "Relationships",
        "Politics",
        "Cryptocurrency",
        "Productivity"
    ]
  return (
    <div>
        <h2 className='font-bold text-lg mb-5'>Recommended topics</h2>
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
