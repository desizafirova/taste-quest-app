import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import verifyJWT, { AuthRequest } from '../middleware/verifyJWT';
import db from '../db/dbSetup';

const router = express.Router();
const saltRounds = 10;

// Register Route
router.post('/register', (req: Request, res: Response) => {
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

// Login Route
router.post('/login', (req: Request, res: Response) => {
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
              expiresIn: '1h',
            });

            // **Store JWT inside an HTTP-only cookie**
            res.cookie('token', token, {
              httpOnly: true, // Prevents JavaScript access
              secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
              sameSite: 'strict', // Protect against CSRF attacks
              maxAge: 60 * 60 * 1000, // 1 hour
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
router.get('/isUserAuth', verifyJWT, (req: AuthRequest, res: Response) => {
  res.json({
    auth: true,
    message: 'You are authenticated',
  });
});

// Logout Route
router.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({ auth: false, message: 'Logged out successfully' });
});

export default router;
