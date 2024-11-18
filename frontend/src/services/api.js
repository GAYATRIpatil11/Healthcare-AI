import axios from 'axios';

export const fetchHealthData = () => {
  return axios.get('/api/healthdata');  // Fetch health data from backend
};

export const predictCalories = (steps, distance, activeMinutes) => {
  return axios.post('/api/predict', { steps, distance, activeMinutes });  // Send input data for prediction
};
