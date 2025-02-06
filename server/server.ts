import express, { Application, Request, Response, NextFunction } from 'express';
import mysql from 'mysql';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

dotenv.config({ path: '.env.local' });

const app: Application = express();
const saltRounds = 10;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL successfully');
  }
});

// CORS Configuration
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

// Extend Request type to include userId
interface AuthRequest extends Request {
  userId?: number;
}

const verifyJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token: string | undefined = req.cookies?.token; // Get token from cookies

  if (!token) {
    res
      .status(403)
      .json({ auth: false, message: 'Token required for authentication' });
    return;
  }

  jwt.verify(token, process.env.NODE_ENV_JWT as Secret, (err, decoded) => {
    if (err) {
      res.status(401).json({ auth: false, message: 'Failed to authenticate' });
      return;
    }

    if (decoded && typeof decoded === 'object' && 'id' in decoded) {
      req.userId = (decoded as JwtPayload).id; // Attach user ID to request
    }

    next(); // Move to the next middleware
  });
};

export default verifyJWT;

// Register Route
app.post('/register', (req: Request, res: Response) => {
  const { username, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: 'Hashing error' });
    }

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

  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Database query error' });

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            const id = result[0].id;
            const token = jwt.sign({ id }, process.env.NODE_ENV_JWT as Secret, {
              expiresIn: '1d',
            });

            // **Store JWT inside an HTTP-only cookie**
            res.cookie('token', token, {
              httpOnly: true, // Prevents JavaScript access
              secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
              sameSite: 'strict', // Protect against CSRF attacks
              maxAge: 24 * 60 * 60 * 1000, // 24 hours
            });

            res.json({ auth: true, message: 'Login successful' }); // No need to send token in response
          } else {
            res
              .status(401)
              .json({ auth: false, message: 'Invalid username or password' });
          }
        });
      } else {
        res.status(404).json({ auth: false, message: 'User not found' });
      }
    }
  );
});

// Check Authentication Route
app.get('/isUserAuth', verifyJWT, (req: Request, res: Response) => {
  res.json({ auth: true, message: 'You are authenticated' });
});

// Logout Route
app.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// Start the server
app.listen(3001, () => console.log('Server running on port 3001'));
