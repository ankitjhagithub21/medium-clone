import React from 'react'

import { Link } from 'react-router-dom'

const NotFound = () => {

  return (
    <div className='flex items-center justify-center h-screen w-full text-center'>
    <div className='lg:w-2/3 w-full p-5 flex flex-col gap-4'>
    <p>PAGE NOT FOUND</p>
     <h1 className='text-8xl text-gray-600'>404</h1>
     <p className='text-3xl font-serif'>Out of nothing, something.</p>
     <p className='text-xl'>You can find (just about) anything on Medium — apparently even a page that doesn’t exist. Maybe these stories will take you somewhere new?</p>
     <Link className='underline' to={"/"}>Home</Link>
     
    </div>

    </div>
  )
}

export default NotFound
