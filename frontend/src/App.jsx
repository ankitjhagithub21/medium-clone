import React, { useEffect, useState } from 'react'
import "./App.css"
import LandingPage from './components/LandingPage'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './app/slices/authSlice'
import NewStory from './pages/NewStory'
import BlogDetails from './pages/BlogDetails'
import Profile from './pages/Profile'
import UpdateBlog from './pages/UpdateBlog'
const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state=>state.auth.user)
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

  useEffect(()=>{
   
    getUserFromServer()
  },[])
  return (
    
    <>
    <Toaster/>
    <Routes>
      <Route path='/' element={user ? <Home /> : <LandingPage getUserFromServer={getUserFromServer}/>}/>
      <Route path='/new-story' element={user ? <NewStory /> : <Home/>}/>
      <Route path='/blog/:id' element={<BlogDetails/>}/>
      <Route path='/user/:id' element={<Profile/>}/>
      <Route path='/update/:id' element={<UpdateBlog/>}/>
    </Routes>
   
    </>
  )
}

export default App
