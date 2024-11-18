import pandas as pd
import bcrypt

def register_user():
    email = input("Enter your email: ")
    password = input("Enter your password: ")

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Check if the CSV file already exists
    try:
        users_df = pd.read_csv('users.csv')
    except FileNotFoundError:
        users_df = pd.DataFrame(columns=['email', 'password'])

    # Check if the email is already registered
    if email in users_df['email'].values:
        print("Email is already registered. Try logging in.")
        return

    # Append the new user
    new_user = pd.DataFrame({'email': [email], 'password': [hashed_password.decode('utf-8')]})
    users_df = pd.concat([users_df, new_user], ignore_index=True)
    
    # Save the updated DataFrame to CSV
    users_df.to_csv('users.csv', index=False)
    print("Registration successful!")

if __name__ == "__main__":
    register_user()
