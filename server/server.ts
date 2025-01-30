import express, { Application, Request, Response } from 'express';
import mysql from 'mysql';
import cors from 'cors'; // Cross-Origin Resource Sharing - in order to send information between frontend and backend
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

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

app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true, // allows the cookie to be enabled
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // allows the body to be parsed

declare module 'express-session' {
  interface SessionData {
    user: { [key: string]: any };
  }
}

app.use(
  session({
    name: 'userId',
    secret: process.env.NODE_ENV_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: new Date(Date.now() + 60 * 60 * 24 * 1000), //24h
    },
  })
);

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

app.get('/login', (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
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
            req.session.user = result;
            console.log(req.session.user);
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
