import os
import pandas as pd
from flask import Flask, request, render_template, redirect, session
import csv
import bcrypt
from wearable_device_api import get_device_data, give_suggestions  # Import the necessary functions

# Paths for the CSV files
USER_CSV_FILE = 'users.csv'
HEALTH_DATA_CSV_FILE = 'health_data.csv'

# Ensure the CSV file for users exists
if not os.path.exists(USER_CSV_FILE):
    with open(USER_CSV_FILE, 'w', newline='') as file:
        pass  # Create an empty file if it doesn't exist

# Initialize Flask app
app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Required for sessions

# Route for the home page
@app.route('/')
def home():
    return render_template('login.html')  # Ensure 'login.html' is in templates folder

# Function to save user data to CSV
def save_user(email, password_hash):
    with open(USER_CSV_FILE, 'a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([email, password_hash])

# Function to check if user exists in CSV and validate password
def user_exists(email, password):
    with open(USER_CSV_FILE, 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            if row[0] == email and bcrypt.checkpw(password.encode(), row[1].encode()):
                return True
    return False

# Route for the registration page
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        save_user(email, password_hash)
        return redirect('/login')  # Redirect to login after registration
    return render_template('register.html')

# Route for the login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        if user_exists(email, password):
            session['email'] = email
            return redirect('/connect_device')  # Redirect to device connection page
        else:
            return "Invalid credentials. Please try again."
    return render_template('login.html')

# Function to check if the device is connected
def is_device_connected():
    # Simulate checking if the device is connected (e.g., via API or local status)
    device_connected = True  # For simulation, we assume the device is always connected
    return device_connected

@app.route('/connect_device', methods=['GET', 'POST'])
def connect_device():
    email = session.get('email')
    if email:
        # Call the device connection check
        if is_device_connected():
            # Fetch and save data from the device
            health_data = get_device_data()
            if health_data is not None and not health_data.empty:
                # Save data if valid
 
                suggestions = give_suggestions(health_data)  # Get suggestions based on the data
                return render_template('device_data.html', health_data=health_data, suggestions=suggestions)
            else:
                return "Failed to fetch data from the wearable device."
        else:
            return "Device is not connected. Please check the device and try again."
    else:
        return redirect('/login')
    

# Main entry point for the Flask app
if __name__ == '__main__':
    app.run(debug=True)