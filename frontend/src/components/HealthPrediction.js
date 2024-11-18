import React, { useState } from 'react';
import { predictCalories } from '../services/api';

const HealthPrediction = () => {
  const [steps, setSteps] = useState('');
  const [distance, setDistance] = useState('');
  const [activeMinutes, setActiveMinutes] = useState('');
  const [predictedCalories, setPredictedCalories] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await predictCalories(steps, distance, activeMinutes);
      setPredictedCalories(response.data.predictedCalories);
    } catch (error) {
      console.error("Error predicting calories:", error);
    }
  };

  return (
    <div className="health-prediction">
      <h2>Get Your Calories Prediction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
        <input
          type="number"
          placeholder="Distance (km)"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
        <input
          type="number"
          placeholder="Active Minutes"
          value={activeMinutes}
          onChange={(e) => setActiveMinutes(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {predictedCalories !== null && (
        <p>Predicted Calories Burned: {predictedCalories}</p>
      )}
    </div>
  );
};

export default HealthPrediction;
