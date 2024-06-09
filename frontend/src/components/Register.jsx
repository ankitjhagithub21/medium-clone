import React from 'react'

const Register = ({openLogin,closeModal}) => {
  return (
    <div className='h-screen absolute top-0 left-0 flex items-center justify-center w-full bg-[#FFFEFE]'>
      <div className='lg:w-1/2 md:w-2/3 w-full p-5 shadow-lg relative flex flex-col items-center justify-center h-full bg-white'>
      <button className='absolute top-2 right-2' onClick={closeModal}>
      <svg  width="29" height="29"><path d="M20.13 8.11l-5.61 5.61-5.6-5.61-.81.8 5.61 5.61-5.61 5.61.8.8 5.61-5.6 5.61 5.6.8-.8-5.6-5.6 5.6-5.62" fill-rule="evenodd"></path></svg>
      </button>
      <h2 className='font-serif text-3xl mb-10'>Join Medium.</h2>
       <form className='flex lg:w-1/2 md:w-2/3 w-full flex-col gap-5'>
        <input type="text" placeholder='Enter your name' className='border rounded-full px-4 py-2 border-black' name='name' required/>
        <input type="text" placeholder='Enter your username' className='border rounded-full px-4 py-2 border-black' name='username' required/>
        <input type="text" placeholder='Enter your password' className='border rounded-full px-4 py-2 border-black' name='password' required/>
        <button type='submit' className='border px-4 py-2 border-black rounded-full hover:bg-black hover:text-white'>Create account</button>
       </form>
       <p className='mt-5'>Already have an account? <span className='font-bold text-green-600 cursor-pointer ' onClick={openLogin}>Sign in</span></p>
      </div>
    </div>
  )
}

export default Register
