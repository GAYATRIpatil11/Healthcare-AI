// Fetch user data and display it
fetch('http://127.0.0.1:5000/user_data')
    .then(response => response.json())
    .then(data => {
        // Set the values in the HTML
        document.getElementById('steps').innerText = data.total_steps || "No data available";
        document.getElementById('calories').innerText = data.calories_burned || "No data available";
    })
    .catch(error => console.error('Error fetching user data:', error));

// Fetch health data and display it
fetch('http://127.0.0.1:5000/health-data')
    .then(response => response.json())
    .then(data => {
        // Set the values in the HTML
        document.getElementById('health_calories').innerText = data.data.calories || "No data available";
        document.getElementById('health_steps').innerText = data.data.steps || "No data available";
    })
    .catch(error => console.error('Error fetching health data:', error));

// Fetch activity data and display it
fetch('http://127.0.0.1:5000/data')
    .then(response => response.json())
    .then(data => {
        // Set the values in the HTML
        document.getElementById('activity_steps').innerText = data.steps || "No data available";
        document.getElementById('activity_distance').innerText = data.distance || "No data available";
        document.getElementById('activity_calories').innerText = data.calories || "No data available";
        document.getElementById('activity_date').innerText = data.activity_date || "No data available";
    })
    .catch(error => console.error('Error fetching activity data:', error));
