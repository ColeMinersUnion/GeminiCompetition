import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import GemiTextbox from './components/GemiText'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const [profileData, setProfileData] = useState(null);
  function getData(){
    axios({
      method:"GET",
      url:"/api/v1/json-data"
    }).then((response) =>{
      const res = response.data
      console.log(res)
      setProfileData(({
        time: res.time,
        author: res.author
      }))
    }).catch((error) => {
      if (error.response){
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }

    })
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p>To get your profile details: </p><button onClick={getData}>Click me</button>
        {profileData && <div>
              <p>Time: {profileData.time}</p>
              <p>Author: {profileData.author}</p>
            </div>
        }
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <GemiTextbox/>
      
    </>
  )
}

export default App
