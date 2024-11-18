import React from 'react';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
  const history = useHistory();

  const handleStart = () => {
    history.push('/dashboard');  // Navigate to the Dashboard
  };

  return (
    <div className="landing-page">
      <h1>Welcome to HealthTracker AI</h1>
      <p>Track your fitness, monitor your health, and get personalized insights.</p>
      <button onClick={handleStart}>Start Monitoring</button>
    </div>
  );
};

export default LandingPage;
