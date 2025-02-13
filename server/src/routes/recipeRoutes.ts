/*
import { Router, Request, Response } from 'express';
import db from '../db/dbSetup'; // Import the database connection

const router = Router();


router.post('/add-recipe', (req: Request, res: Response) => {
  const { title, image, ingredients, steps } = req.body;

  if (!title || !ingredients || !steps) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const query =
    'INSERT INTO recipes (title, image, ingredients, steps) VALUES (?, ?, ?, ?)';
  const values = [title, image, ingredients, steps];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error occurred' });
    }

    res.status(201).json({
      message: 'Recipe added successfully',
      recipeId: result.insertId,
    });
  });
});

export default router;
*/
