import express, { Request, Response } from 'express';
import mysql from 'mysql';
import cors from 'cors'; // Cross-Origin Resource Sharing - in order to send information between frontend and backend
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  port: 3306,
  password: process.env.NODE_ENV_PASS,
  database: 'LoginSystem',
});

db.connect((err) => {
  if (err) {
    console.error('Error occurred while connecting:', err.message);
  } else {
    console.log('Connected to MySQL successfully');
  }
});

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.post('/register', (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Insert the new user into the database
  db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, password],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error occurred' });
      }

      res.status(201).json({
        message: 'User registered successfully',
        userId: result.insertId,
      });
    }
  );
});

app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Insert the new user into the database
  db.query(
    'SELECT * From users WHERE username = ? AND password = ?',
    [username, password],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error occurred' });
      }

      if (result.length > 0) {
        return res.status(200).json({
          message: 'User logged in successfully',
          userId: result.insertId,
        });
      } else {
        return res.status(401).json({ message: 'Wrong username or password' });
      }
    }
  );
});

app.listen(3001, () => console.log('Server running on port 3001'));
