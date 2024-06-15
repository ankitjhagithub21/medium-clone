import React from 'react'

const Footer = ({author}) => {
  
  return (
    <footer className='bg-gray-100'>
        <div className='lg:w-2/3 w-full p-5 mx-auto flex flex-col gap-2 '>
            <img src={author.profilePhoto} alt="author pic" className='w-24 rounded-full border' />
            <h2 className='text-2xl font-bold'>Written By {author.name}</h2>
          
        </div>
    </footer>
  )
}

export default Footer
