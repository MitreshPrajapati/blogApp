
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from './Profile'

const MainRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<h1>home page</h1>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
    </Routes>
  )
}

export default MainRoute