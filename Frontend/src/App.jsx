import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

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
      
      

      <p>To get your profile details: </p><button onClick={getData}>Click me</button>
        {profileData && <div>
              <p>Time: {profileData.time}</p>
              <p>Author: {profileData.author}</p>
            </div>
        }
      
      
      
    </>
  )
}

export default App
