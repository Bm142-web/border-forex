import express from 'express';
const router = express.Router();

export default function(db) {
  router.post('/', (req, res) => {
    const { passport, amount, currency } = req.body;
    db.run('INSERT INTO reservations(passport, amount, currency) VALUES(?, ?, ?)', [passport, amount, currency], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: 'Reservation made' });
    });
  });

  router.get('/:passport', (req, res) => {
    db.all('SELECT * FROM reservations WHERE passport = ?', [req.params.passport], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  return router;
}
