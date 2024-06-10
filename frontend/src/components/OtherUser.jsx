import React from 'react'

const OtherUser = () => {
  return (
    <div className='flex items-center gap-2 justify-between'>
      <div className='flex gap-1 items-start'>
        <img src="https://miro.medium.com/v2/resize:fill:112:112/1*Qu8jfX_Ab4objLtUYavRcw.jpeg" alt="user profile image" className='w-6 rounded-full border'/>
        <div>
            <h2 className='font-bold'>User name</h2>
            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum consectetur voluptates incidunt magni consequatur doloremque numquam nam, odio nihil impedit?</p>
        </div>
      </div>
      <div>
        <button className='px-4 py-2 text-sm border border-black rounded-full'>Follow</button>
      </div>
    </div>
  )
}

export default OtherUser
