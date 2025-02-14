import express, { Router } from 'express';
import db from '../db/dbSetup';

const router = Router();

router.post(
  '/add-recipe',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    try {
      const { title, image, ingredients, steps } = req.body;

      if (!title || !ingredients || !steps) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }

      const query =
        'INSERT INTO recipes (title, image, ingredients, steps) VALUES (?, ?, ?, ?)';
      const values = [
        title,
        image,
        JSON.stringify(ingredients),
        JSON.stringify(steps),
      ];

      db.query(query, values, (err: any, result: any) => {
        if (err) {
          console.error('Database error:', err);
          res.status(500).json({ error: 'Database error occurred' });
          return;
        }

        res.status(201).json({
          message: 'Recipe added successfully',
          recipeId: result.insertId,
        });
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      next(error);
    }
  }
);

export default router;
