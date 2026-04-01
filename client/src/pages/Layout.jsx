import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='flex flex-col gap-12 min-h-screen'>
      <Navbar/>
      <section className='flex justify-center items-center'>
        <Outlet/>
      </section>
      <Footer/>
    </div>
  )
}

export default Layout
