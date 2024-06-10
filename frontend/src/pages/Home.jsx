import React, { useEffect } from 'react'
import Topics from '../components/Topics'
import Blogs from '../components/Blogs'
import RecomTopics from '../components/RecomTopics'
import OtherUsers from '../components/OtherUsers'
import Navbar from '../components/Navbar'



const Home = () => {
  useEffect(() => {
    document.title = "Medium"
  }, [])
  return (
   <>
   <Navbar/>
    <section className='container mx-auto flex flex-wrap'>
      <div className='lg:w-2/3 w-full p-5'>
        <Topics />
        <Blogs />
      </div>
      <div className='lg:w-1/3 w-full p-5 border-l flex flex-col gap-5'>
        <RecomTopics />
       <OtherUsers/>

      </div>
    </section>
   </>
  )
}

export default Home
