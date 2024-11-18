import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

# Load your health data (replace with actual path)
data = pd.read_csv('C:/Users/admin/HealthTracker-AI/data/new_cleaned_dataset.csv')

# Strip any leading/trailing spaces in column names
data.columns = data.columns.str.strip()

# Check the columns of the data to ensure 'TotalSteps' exists
print(data.columns)

# Example: Train a model to predict calories based on steps
if 'TotalSteps' in data.columns and 'Calories' in data.columns:
    X = data[['TotalSteps', 'TotalDistance', 'VeryActiveDistance', 'VeryActiveMinutes']]  # Use multiple features
    y = data['Calories']  # Target variable

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train a simple linear regression model
    model = LinearRegression()
    model.fit(X_train, y_train)

    # Example: Predict calories for new data
    # Ensure the input is in the same format (DataFrame) as the training data
    input_data = pd.DataFrame([[5000, 5.5, 2.0, 30]], columns=['TotalSteps', 'TotalDistance', 'VeryActiveDistance', 'VeryActiveMinutes'])
    
    # Predict calories for new data
    predicted_calories = model.predict(input_data)
    print(f"Predicted calories for 5000 steps: {predicted_calories[0]}")

else:
    print("The required columns ('TotalSteps' and 'Calories') are not present in the dataset.")
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# Predict on the test set
y_pred = model.predict(X_test)

# Evaluate the model
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean Absolute Error: {mae}")
print(f"Mean Squared Error: {mse}")
print(f"R-squared: {r2}")
