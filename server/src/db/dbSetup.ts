import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  port: 3306,
  password: process.env.NODE_ENV_PASS,
  database: 'LoginSystem',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL successfully');
  }
});

// Create "users" table if it doesn't exist
const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
`;

// Create "recipes" table if it doesn't exist
const createRecipesTable = `
CREATE TABLE IF NOT EXISTS recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  ingredients TEXT NOT NULL,
  steps TEXT NOT NULL,
  userId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
`;

// Execute table creation queries
db.query(createUsersTable, (err) => {
  if (err) console.error('Error creating users table:', err);
  else console.log('Users table created or already exists');
});

db.query(createRecipesTable, (err) => {
  if (err) console.error('Error creating recipes table:', err);
  else console.log('Recipes table created or already exists');
});

export default db;
