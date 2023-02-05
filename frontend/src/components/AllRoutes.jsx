import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Blogs } from '../Pages/Blogs'
import { Home } from '../Pages/Home'
import { Login } from '../Pages/Login'
import { Signup } from '../Pages/Signup'

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/blog' element={<Blogs/>}/>
    </Routes>
  )
}
