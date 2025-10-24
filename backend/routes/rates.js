import express from 'express';
const router = express.Router();

export default function(db) {
  router.get('/', (req, res) => {
    db.all('SELECT * FROM rates', [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  router.post('/update', (req, res) => {
    const { currency, rate } = req.body;
    db.run('UPDATE rates SET rate = ? WHERE currency = ?', [rate, currency], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    });
  });

  return router;
}
