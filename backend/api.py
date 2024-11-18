import random
from flask import Flask, jsonify
from flask_cors import CORS  # Importing CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Root endpoint for checking if the API is running
@app.route('/')
def home():
    return "HealthTracker API Running"

# Example endpoint for getting user data
@app.route('/user_data', methods=['GET'])
def get_user_data():
    data = {
        "user_id": 1,
        "total_steps": random.randint(5000, 20000),  # Random steps between 5000 and 20000
        "calories_burned": random.randint(200, 1000)  # Random calories between 200 and 1000
    }
    return jsonify(data)

# Endpoint for health-related data
@app.route('/health-data', methods=['GET'])
def get_health_data():
    data = {
        "status": "success", 
        "data": {
            "calories": random.randint(1200, 1800),  # Random calories between 1200 and 1800
            "steps": random.randint(7000, 12000)  # Random steps between 7000 and 12000
        }
    }
    return jsonify(data)

# Endpoint for activity data (steps, distance, calories burned, etc.)
@app.route('/data', methods=['GET'])
def get_data():
    data = {
        'id': 1,
        'steps': random.randint(5000, 20000),  # Random steps between 5000 and 20000
        'distance': round(random.uniform(3.0, 10.0), 2),  # Random distance between 3.0 and 10.0 km
        'calories': random.randint(200, 800),  # Random calories between 200 and 800
        'activity_date': '2024-11-01'  # You can keep the static date or generate a random one as needed
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
