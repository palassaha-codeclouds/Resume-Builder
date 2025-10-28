import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Layout from './pages/layout'
import Dashboard from './pages/dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/preview'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
    <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='app' element={<Layout />}>
          <Route index element={<Login />} /> 
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>

        <Route path='view/:resumeId' element={<Preview />} />

        {/* <Route path='login' element={<Login />}/> */}

      </Routes>
    </>
  )
}

export default App
