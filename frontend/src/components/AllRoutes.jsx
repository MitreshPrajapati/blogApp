import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { BlogEdit } from '../Pages/BlogEdit'
import { Blogs } from '../Pages/Blogs'
import { Home } from '../Pages/Home'
import { Login } from '../Pages/Login'
import { Profile } from '../Pages/Profile'
import { Signup } from '../Pages/Signup'
import { SingleBlog } from '../Pages/SingleBlog'
import { WriteBlog } from '../Pages/WriteBlog'

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/blog' element={<Blogs/>}/>
        <Route path='/blog/:id' element={<BlogEdit/>}/>
        <Route path='/writeblog' element={<WriteBlog/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/singleBlog/:id' element={<SingleBlog/>}/>
    </Routes>
  )
}
