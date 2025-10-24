import express from 'express';
const router = express.Router();

export default function(db) {
  router.post('/register', (req, res) => {
    const { passport, name } = req.body;
    db.run('INSERT INTO users(passport, name) VALUES(?, ?)', [passport, name], (err) => {
      if (err) return res.status(400).json({ error: 'User already exists' });
      res.json({ success: true, message: 'Registered successfully' });
    });
  });

  router.post('/login', (req, res) => {
    const { passport } = req.body;
    db.get('SELECT * FROM users WHERE passport = ?', [passport], (err, user) => {
      if (err || !user) return res.status(400).json({ error: 'User not found' });
      res.json({ success: true, user });
    });
  });

  return router;
}
