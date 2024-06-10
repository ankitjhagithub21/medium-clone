import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
const Login = ({openRegister,closeModal,getUserFromServer}) => {
  const initialData = {
    email:"",
    password:"",
}
const [formData,setFormData] = useState(initialData)
const [loading,setLoading] = useState(false)

const handleChange = (e) =>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
}
const handleSubmit = async(e) =>{
    e.preventDefault()
    try{
        setLoading(true)
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:'include',
            body:JSON.stringify(formData)
        })

        const data = await res.json()

        if(data.success){
          getUserFromServer()
            toast.success(data.message)
            setFormData(initialData) 
            closeModal()
        }else{
            toast.error(data.message)
        }

    }catch(error){
        console.log(error)
        toast.error("Error !")
    }finally{
        setLoading(false)
    }
}

  return (
    <div className='h-screen w-full bg-[#FFFEFE] absolute top-0 left-0 flex items-center justify-center'>
      <div className='lg:w-1/2 md:w-2/3 w-full shadow-lg flex p-5 flex-col items-center justify-center bg-white h-full relative'>
      <button className='absolute top-2 right-2' onClick={closeModal}>
      <svg  width="29" height="29"><path d="M20.13 8.11l-5.61 5.61-5.6-5.61-.81.8 5.61 5.61-5.61 5.61.8.8 5.61-5.6 5.61 5.6.8-.8-5.6-5.6 5.6-5.62" fillRule="evenodd"></path></svg>
      </button>
      <h2 className='font-serif text-3xl mb-10'>Welcome back.</h2>
       <form className='flex lg:w-1/2 md:w-2/3 w-full mx-auto flex-col gap-5' onSubmit={handleSubmit}>
        <input type="email" placeholder='Email' value={formData.email} onChange={handleChange} className='border rounded-full px-4 py-2 border-black' name='email' required/>
        <input type="text" placeholder='Password' value={formData.password} onChange={handleChange} className='border rounded-full px-4 py-2 border-black' name='password' required/>
        <button className='border px-4 py-2 border-black hover:bg-black hover:text-white rounded-full'>
          {
            loading ? 'Loading...' :'Login'
          }
        </button>

       </form>
       <p className='mt-5'>No account? <span className='text-green-600 font-bold cursor-pointer' onClick={openRegister}>Create one</span></p>
      </div>
    </div>
  )
}

export default Login
