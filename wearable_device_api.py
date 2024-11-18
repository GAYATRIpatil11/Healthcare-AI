import pandas as pd
import random

def generate_mock_data():
    # Generate random mock data for simulation
    heart_rate = random.randint(60, 100)  # Simulate heart rate
    activity_level = random.choice([1, 2, 3, 4, 5])  # Random activity level (1 to 5)
    sleep_duration = round(random.uniform(6, 8), 2)  # Random sleep duration (6-8 hours)
    mood = random.choice(['Happy', 'Neutral', 'Sad', 'Energetic', 'Stressed'])  # Random mood
    
    # Create a DataFrame to simulate health data
    data = {
        'heart_rate': [heart_rate],
        'activity_level': [activity_level],
        'sleep_duration': [sleep_duration],
        'mood': [mood]
    }
    
    return pd.DataFrame(data)

# Call this function to simulate device data collection
def get_device_data():
    return generate_mock_data()

def give_suggestions(data):
    suggestions = []
    # Check heart rate
    if data['heart_rate'][0] > 90:
        suggestions.append("Consider relaxing or taking a break; your heart rate is high.")
    
    # Check activity level
    if data['activity_level'][0] < 3:
        suggestions.append("Increase your physical activity for better health.")
    
    # Check sleep duration
    if data['sleep_duration'][0] < 7:
        suggestions.append("Try to get more sleep for better recovery.")
    
    # Check mood
    if data['mood'][0] == "Stressed":
        suggestions.append("Take some time to relax and reduce stress.")
    
    return suggestions
