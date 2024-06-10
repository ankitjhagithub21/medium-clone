import React from 'react'
import OtherUser from './OtherUser'

const OtherUsers = () => {
  return (
    <div className='flex flex-col gap-4'>
    <h2 className='font-bold text-lg'>Who to follow</h2>
    <OtherUser/>
    <OtherUser/>
    <OtherUser/>
  </div>
  )
}

export default OtherUsers
