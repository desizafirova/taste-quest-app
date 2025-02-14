import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import db from '../db/dbSetup';
import authRoutes from '../routes/authRoutes';
import recipeRoutes from '../routes/recipeRoutes';

dotenv.config({ path: '.env.local' });

const app: Application = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  })
);

// Use Routes
app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);

// Start the server
app.listen(3001, () => console.log('Server running on port 3001'));
