import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Outlet} from 'react-router-dom'
import App from './App.jsx'
//import Career from './pages/Career.jsx'
//import JobPrep from './pages/JobPrep.jsx'
//import Profile from './pages/Profile.jsx'
import SignUp from './pages/SignUp.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import './index.css'

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
    }
  ]
}])

//Initializing the webpage
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
