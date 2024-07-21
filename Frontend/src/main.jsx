import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
//import Career from './pages/Career.jsx'
//import JobPrep from './pages/JobPrep.jsx'
//import Profile from './pages/Profile.jsx'
import SignUp from './pages/SignUp.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Login from './pages/LogIn.jsx'
import JobPrep from './pages/JobPrep.jsx'
import Career from './pages/Career.jsx'
import Profile from './pages/Profile.jsx'

import './index.css'
import Contact from './pages/ContactMe.jsx'

const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  );
};

const router = createBrowserRouter([{
  path:'/',
  element:<Layout/>,
  children:[
    {
      path:"/",
      element: <App/>
    },
    {
      path:"/Signup",
      element: <SignUp/>
    },
    {
      path:"/Login",
      element: <Login/>
    },
    {
      path:"/Job",
      element: <JobPrep/>
    },
    {
      path:"/Career",
      element:<Career/>
    },
    {
      path:"/Profile",
      element:<Profile/>
    },
    {
      path:"/Contact",
      element:<Contact/>
    }
  ]
}])

//Initializing the webpage
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
  </RouterProvider>,
)
