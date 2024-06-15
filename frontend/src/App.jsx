import React, { useEffect, useState} from 'react'
import "./App.css"
import LandingPage from './components/LandingPage'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './app/slices/authSlice'
import NewStory from './pages/NewStory'
import BlogDetails from './pages/BlogDetails'
import Profile from './pages/Profile'
import UpdateBlog from './pages/UpdateBlog'
import toast from 'react-hot-toast'
import NotFound from './pages/NotFound'
import Result from './pages/Result'
const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state=>state.auth.user)
  const [following,setFollowing] = useState(false)
  const getUserFromServer = async() =>{
    try{
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/user`,{
        credentials:'include'
      })
      const data = await res.json()
      if(data.success){
        dispatch(setUser(data.user))
      }
    }catch(error){
      console.log(error)
    }

  }
  
  
  const handleFollowUnfollow = async (userId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/follow/${userId}`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setFollowing(data.following)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error!");
    }
  };

  useEffect(()=>{
   
    getUserFromServer()
  },[])
  return (
    
    <>
    <Toaster/>
    <Routes>
      <Route path='/' element={user ? <Home handleFollowUnfollow={handleFollowUnfollow} following={following}/> : <LandingPage getUserFromServer={getUserFromServer}/>}/>
      <Route path='/new-story' element={user ? <NewStory /> : <Home/>}/>
      <Route path='/blog/:id' element={<BlogDetails/>}/>
      <Route path='/user/:id' element={<Profile handleFollowUnfollow={handleFollowUnfollow} following={following} />}/>
      <Route path='/update/:id' element={<UpdateBlog/>}/>
      <Route path='/*' element={<NotFound/>}/>
      <Route path='/search/:id' element={<Result/>}/>
    </Routes>
   
    </>
  )
}

export default App
