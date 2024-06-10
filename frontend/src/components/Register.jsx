import React, { useState } from 'react'
import toast from "react-hot-toast"
const Register = ({openLogin,closeModal}) => {
    const initialData = {
        name:"",
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
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            })

            const data = await res.json()

            if(data.success){
                toast.success(data.message)
                setFormData(initialData) 
                openLogin()  
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
    <div className='h-screen absolute top-0 left-0 flex items-center justify-center w-full bg-[#FFFEFE]'>
      <div className='lg:w-1/2 md:w-2/3 w-full p-5 shadow-lg relative flex flex-col items-center justify-center h-full bg-white'>
      <button className='absolute top-2 right-2' onClick={closeModal}>
      <svg  width="29" height="29"><path d="M20.13 8.11l-5.61 5.61-5.6-5.61-.81.8 5.61 5.61-5.61 5.61.8.8 5.61-5.6 5.61 5.6.8-.8-5.6-5.6 5.6-5.62" fillRule="evenodd"></path></svg>
      </button>
      <h2 className='font-serif text-3xl mb-10'>Join Medium.</h2>
       <form className='flex lg:w-1/2 md:w-2/3 w-full flex-col gap-5' onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter your name' value={formData.name} onChange={handleChange} className='border rounded-full px-4 py-2 border-black' name='name' required/>
        <input type="email" placeholder='Enter your email' value={formData.email} onChange={handleChange} className='border rounded-full px-4 py-2 border-black' name='email' required/>
        <input type="text" placeholder='Enter your password' value={formData.password} onChange={handleChange} className='border rounded-full px-4 py-2 border-black' name='password' required/>
        <button type='submit' className='border px-4 py-2 border-black rounded-full hover:bg-black hover:text-white'>
            {
                loading ? 'Loading...' : 'Create account'
            }
        </button>
       </form>
       <p className='mt-5'>Already have an account? <span className='font-bold text-green-600 cursor-pointer ' onClick={openLogin}>Sign in</span></p>
      </div>
    </div>
  )
}

export default Register
