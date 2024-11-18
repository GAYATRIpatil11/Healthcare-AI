import pandas as pd
import bcrypt

def login_user():
    email = input("Enter your email: ")
    password = input("Enter your password: ")

    try:
        users_df = pd.read_csv('users.csv')
    except FileNotFoundError:
        print("No registered users found. Please register first.")
        return

    # Check if the email exists
    user = users_df[users_df['email'] == email]
    if user.empty:
        print("Email not found. Please register.")
        return

    # Verify the password
    stored_password = user.iloc[0]['password']
    if bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
        print("Login successful!")
    else:
        print("Incorrect password.")

if __name__ == "__main__":
    login_user()
