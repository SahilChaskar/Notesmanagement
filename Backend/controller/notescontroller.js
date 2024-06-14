const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
// require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'kL9zG0t3Jf1vM8bXyQ4eA2wN5cR6hP7';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Sahil123',
  port: 5432,
});

exports.createNote = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
    // console.log(token)
  const {  title, content } = req.body;
  // console.log(title, content)
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        // console.log(decoded)
        await pool.query('INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3)', [decoded.id, title, content]);
        res.status(201).send('Note created');
    } catch (err) {
        console.error('Error creating notes', err);
        res.status(401).send('Invalid token');
    }
};

exports.getNotes = async (req, res) => {
  // console.log(req)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // console.log(token)
  try {
      // console.log(SECRET_KEY, token)
        const decoded = jwt.verify(token, SECRET_KEY);
        const result = await pool.query('SELECT * FROM notes WHERE user_id = $1', [decoded.id]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting notes', err);
        res.status(401).send('Invalid token');
    }
};
