import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import Career from './pages/Career.jsx'
import JobPrep from './pages/JobPrep.jsx'
import Profile from './pages/Profile.jsx'
import SignUp from './pages/SignUp.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App />
  },
  {
    path:'profile',
    element: <Profile/>
  },
  {
    path:'career',
    element:<Career/>
  },
  {
    path:'JobPrep',
    element:<JobPrep/>
  },
  {
    path:'Signup',
    element:<SignUp/>
  }
])

//Initializing the webpage
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
