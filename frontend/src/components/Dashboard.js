// frontend/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { fetchHealthData, predictCalories } from '../services/api';  // Assuming these functions are defined in the API service
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {
  const [healthData, setHealthData] = useState(null);
  const [predictedCalories, setPredictedCalories] = useState(null);

  // Fetch health data when the component mounts
  useEffect(() => {
    fetchHealthData()
      .then(response => setHealthData(response.data))
      .catch(error => console.error("Error fetching health data:", error));
  }, []);

  // Handle calories prediction
  const handlePrediction = () => {
    if (healthData) {
      predictCalories(healthData.steps, healthData.distance, healthData.activeMinutes)
        .then(response => setPredictedCalories(response.data.predictedCalories))
        .catch(error => console.error("Error predicting calories:", error));
    }
  };

  // Return loading state while fetching data
  if (!healthData) {
    return <div>Loading health data...</div>;
  }

  // Chart data for visual representation
  const chartData = {
    labels: ['Steps', 'Calories Burned'],
    datasets: [
      {
        label: 'Health Metrics',
        data: [healthData.steps, predictedCalories || 0],  // If no prediction, default to 0
        backgroundColor: ['#ff9999', '#66b3ff'],
      },
    ],
  };

  return (
    <div className="dashboard">
      <h2>Your Health Dashboard</h2>
      <div>
        <p>Steps Taken: {healthData.steps}</p>
        <p>Calories Burned: {predictedCalories || 'Loading...'}</p>
        <p>Heart Rate: {healthData.heartRate} BPM</p>
        <p>Sleep Data: {healthData.sleepHours} hours</p>
      </div>

      <button onClick={handlePrediction}>Predict Calories</button>

      <div>
        <h3>Charts/Graphs</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
