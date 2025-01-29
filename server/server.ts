import express, { Request, Response } from 'express';
import mysql from 'mysql';
import cors from 'cors'; // Cross-Origin Resource Sharing - in order to send information between frontend and backend

const app = express();
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  port: 3306,
  password: 'D3s!sl@v@',
  database: 'LoginSystem',
});

db.connect((err) => {
  if (err) {
    console.error('Error occurred while connecting:', err.message);
  } else {
    console.log('Connected to MySQL successfully');
  }
});

app.use(cors({ origin: 'http://localhost:5173' }));

app.post('/register', (req: Request, res: Response) => {
  const { username, password } = req.body;

  // if (!username || !password) {
  //   return res
  //     .status(400)
  //     .json({ error: 'Username and password are required' });
  // }

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

app.listen(3001, () => console.log('Server running on port 3001'));
