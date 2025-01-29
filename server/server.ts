import express, { Request, Response } from 'express';
import mysql from 'mysql';

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

app.listen(3001, () => console.log('Server running on port 3001'));
