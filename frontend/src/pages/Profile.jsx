import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import PageLoading from './PageLoading'
import Blog from '../components/Blog'
import { useSelector } from 'react-redux'

const Profile = () => {
    const {id} = useParams()
    const [user,setUser] = useState(null)
    const currUser = useSelector(state=>state.auth.user)
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        const fetchUser = async() =>{
             try{
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/profile/${id}`)
                const data = await res.json()
                if(data.success){
                    setUser(data.user)
                    document.title = `${data.user.name} - Medium`
                }

             }catch(error){
                    console.log(error)
             }finally{
                setLoading(false)
             }

        }
        fetchUser()
    },[id])
    if(loading){
        return <PageLoading/>
    }
    if(!user){
        return <p>User not found.</p>
    }
  return (
    <>
      <Navbar/>
      <div className='container p-5 flex flex-wrap-reverse mx-auto'>
        <div className='lg:w-2/3 w-full lg:p-5 p-0'>
            <h1 className='text-4xl mb-5 font-bold'>{user.name}</h1>
            <div className='flex gap-5 items-start border-b p-2'>
                <Link to={"/"}>Home</Link>
                <Link to={"/"}>About</Link>
            </div>
            <div className='flex flex-col gap-5'>
                {
                    user.blogs.map((blog)=>{
                        return <Blog key={blog._id} blog={blog} name={user.name} profilePhoto={user.profilePhoto}/>
                    })
                }
            </div>
        </div>
        <div className='lg:w-1/4 w-full lg:border-l lg:p-5 flex flex-col gap-3 items-start'>
        <img src={user.profilePhoto} alt="profile pic" loading='lazy' width={100} className='rounded-full'/>
        <p className='text-xl font-bolds'>{user.name}</p>
        <div className='flex gap-2 items-center'>
            <p>Followers: {user.followers.length}</p>
            <p>Following: {user.following.length}</p>
        </div>
        <p>{user.bio}</p>
        {
            currUser._id == user._id && <button className='text-green-900'>Edit Profile</button>
        }
        </div>
      </div>
    </>
  )
}

export default Profile
