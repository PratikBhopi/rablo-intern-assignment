import React from 'react'
import Login from './pages/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'


function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Login />
    },
    {
      path:'/register',
      element:<Register />
    },
    {
      path:'/dashboard',
      element:<Dashboard />
    }
   
  ])

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App