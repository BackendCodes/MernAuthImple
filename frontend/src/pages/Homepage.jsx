import React from 'react'
import Navbar from '../components/Navbar'
import Herosec from '../components/Herosec'

const Homepage = () => {
  return (
   <>
   
    <div className='bg-[url(./bg_img.png)] w-full min-h-screen flex items-center justify-center flex-col'>
            <Navbar/>
            <Herosec/>
    </div>
   
   </>
  )
}

export default Homepage