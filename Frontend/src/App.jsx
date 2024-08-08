import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import leftImage from '../images/cap.jpeg';
import rightImage from '../images/suitcase.jpeg';


function App() {
  const [profileData, setProfileData] = useState(null);

  function getData() {
    axios({
      method: "GET",
      url: "/api/v1/json-data"
    }).then((response) => {
      const res = response.data;
      setProfileData({
        time: res.time,
        author: res.author
      });
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
  }

  return (
    <div className="flex justify-between">
      <img src={leftImage} alt="Left" className="side-image" />
      
      <div className="content">
        <p>To get your profile details: </p>
        <button onClick={getData}>Click me</button>
        {profileData && (
          <div>
            <p>Time: {profileData.time}</p>
            <p>Author: {profileData.author}</p>
          </div>
        )}
      </div>
      
      <img src={rightImage} alt="Right" className="side-image" />
    </div>
  );
}

export default App;