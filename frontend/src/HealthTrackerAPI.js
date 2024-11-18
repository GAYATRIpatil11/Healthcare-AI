import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HealthTrackerAPI = () => {
  // Define the state for storing user data
  const [userData, setUserData] = useState({});
  
  // useEffect hook to fetch data from the API when the component mounts
  useEffect(() => {
    // Make the GET request to the Flask API
    axios.get('http://127.0.0.1:5000/user_data')
      .then(response => {
        // Set the fetched data to the state
        setUserData(response.data);
      })
      .catch(error => {
        console.log("There was an error fetching data!", error);
      });
  }, []); // The empty dependency array means this runs only once when the component is first rendered
  
  // Render the user data
  return (
    <div>
      <h1>User Data</h1>
      <p>User ID: {userData.user_id}</p>
      <p>Total Steps: {userData.total_steps}</p>
      <p>Calories Burned: {userData.calories_burned}</p>
    </div>
  );
}

export default HealthTrackerAPI;
