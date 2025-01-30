import express, { Application, Request, Response } from 'express';
import mysql from 'mysql';
import cors from 'cors'; // Cross-Origin Resource Sharing - in order to send information between frontend and backend
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config({ path: '.env.local' });

const saltRounds = 10;

const app: Application = express();
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

  bcrypt.hash(password, saltRounds, (err, hash) => {
    // Insert the new user into the database
    db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hash],
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
});

app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Insert the new user into the database
  db.query(
    'SELECT * From users WHERE username = ?',
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            res.send({ message: 'Successfully logged in' });
          } else {
            res.send({ message: 'Wrong username/password combination' });
          }
        });
      } else {
        res.send({ message: 'User does not exist' });
      }
    }
  );
});

app.listen(3001, () => console.log('Server running on port 3001'));
