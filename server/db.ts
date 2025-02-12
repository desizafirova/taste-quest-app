import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  port: 3306,
  password: process.env.NODE_ENV_PASS,
  database: 'RecipeDB', // Change to your new database
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL successfully');
  }
});

export default db;
