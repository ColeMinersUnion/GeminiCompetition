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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex justify-between">
      <img src={leftImage} alt="Left" className="side-image" />
      
      <div className="content">
        {profileData && (
          <div>
            <p>Time: {profileData.time}</p>
            <p>Author: {profileData.author}</p>
          </div>
        )}
        <div className="summary-section">
          <h2>Welcome to Sprout!</h2>
          <p>Your journey from college to career starts here. At Sprout, we are dedicated to 
helping recent graduates discover their ideal career path and seamlessly transition 
into the workforce. We understand that many students leave college unsure of what 
careers their degrees can lead to, which is why we’ve created a platform to guide you 
every step of the way. Whether it's through tailored interview prep or perfecting your 
resume or even picking a career path to start your journey, we’re here to plant the 
seeds for your success and help you flourish into a full-time professional.</p>
        </div>
      </div>
      
      <img src={rightImage} alt="Right" className="side-image" />
    </div>
  );
}

export default App;
