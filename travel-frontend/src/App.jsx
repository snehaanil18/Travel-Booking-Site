import { useState } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Places from './Pages/Places'
import Location from './Pages/Location'
import Admin from './Pages/Admin'
import AdminLogin from './Pages/AdminLogin'
import About from './Pages/About'
import PageNotFound from './Components/PageNotFound'
import EditPackage from './Pages/EditPackage'


function App() {
 

  return (
    <>
      <Header/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'login'} element={<Auth/>}/>
        <Route path={'register'} element={<Auth register/>}/>
        <Route path={'adminregister'} element={<AdminLogin register/>}/>
        <Route path={'adminlogin'} element={<AdminLogin login/>}/>
        <Route path={'places'} element={<Places/>}/>
        <Route path={'location/:id'} element={<Location/>}/>
        <Route path={'about'} element={<About/>} />
        <Route path={'admin'} element={<Admin/>}/>
        <Route path={'*'} element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
