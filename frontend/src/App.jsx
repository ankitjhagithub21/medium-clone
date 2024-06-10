import React, { useEffect, useState } from 'react'
import "./App.css"
import LandingPage from './components/LandingPage'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './app/slices/authSlice'
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
    {
      user && <Navbar/>
    }
    <Routes>
      <Route path='/' element={user ? <Home /> : <LandingPage getUserFromServer={getUserFromServer}/>}/>
    </Routes>
   
    </>
  )
}

export default App
