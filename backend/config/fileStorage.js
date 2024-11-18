const fs = require('fs');
const path = require('path');

// Ensure the directory exists for storing user data
const ensureStorageDirectoryExists = () => {
   const dirPath = path.join(__dirname, '../data');
   if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
   }
};

// Check and create the CSV file if it doesn't exist
ensureStorageDirectoryExists();
const filePath = path.join(__dirname, '../data/users.csv');
if (!fs.existsSync(filePath)) {
   fs.writeFileSync(filePath, 'Name,Email,Age,Gender,MedicalHistory\n');
}

module.exports = { filePath };
