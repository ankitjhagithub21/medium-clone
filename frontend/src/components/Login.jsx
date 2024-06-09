import React from 'react'

const Login = ({openRegister,closeModal}) => {
  return (
    <div className='h-screen w-full bg-[#FFFEFE] absolute top-0 left-0 flex items-center justify-center'>
      <div className='lg:w-1/2 md:w-2/3 w-full shadow-lg flex flex-col items-center justify-center bg-white h-full relative'>
      <button className='absolute top-2 right-2' onClick={closeModal}>
      <svg  width="29" height="29"><path d="M20.13 8.11l-5.61 5.61-5.6-5.61-.81.8 5.61 5.61-5.61 5.61.8.8 5.61-5.6 5.61 5.6.8-.8-5.6-5.6 5.6-5.62" fill-rule="evenodd"></path></svg>
      </button>
      <h2 className='font-serif text-3xl mb-10'>Welcome back.</h2>
       <form className='flex lg:w-1/2 md:w-2/3 w-full mx-auto flex-col gap-5'>
        <input type="text" placeholder='Username' className='border rounded-full px-4 py-2 border-black' name='username' required/>
        <input type="text" placeholder='Password' className='border rounded-full px-4 py-2 border-black' name='password' required/>
        <button className='border px-4 py-2 border-black hover:bg-black hover:text-white rounded-full'>Login</button>

       </form>
       <p className='mt-5'>No account? <span className='text-green-600 font-bold cursor-pointer' onClick={openRegister}>Create one</span></p>
      </div>
    </div>
  )
}

export default Login
