// =============================
// Border Forex Backend Server
// =============================

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Initialize app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// =============================
// Database setup
// =============================
const dbFile = path.join(__dirname, "database.db");

const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1); // Stop app if DB fails
  } else {
    console.log("✅ Connected to SQLite database.");
  }
});

// Create tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      id_number TEXT,
      passport_number TEXT,
      bus_name TEXT,
      ticket_number TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS rates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      currency_from TEXT,
      currency_to TEXT,
      rate REAL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// =============================
// API Routes
// =============================

// Health check
app.get("/", (req, res) => {
  res.send("🌍 Border Forex API is running!");
});

// Add or login user
app.post("/api/user", (req, res) => {
  const { name, id_number, passport_number, bus_name, ticket_number } = req.body;

  if (!id_number && !passport_number) {
    return res.status(400).json({ error: "ID or Passport number is required" });
  }

  db.run(
    `INSERT INTO users (name, id_number, passport_number, bus_name, ticket_number)
     VALUES (?, ?, ?, ?, ?)`,
    [name || null, id_number || null, passport_number || null, bus_name || null, ticket_number || null],
    function (err) {
      if (err) {
        console.error("❌ Error inserting user:", err.message);
        return res.status(500).json({ error: "Database insert failed" });
      }
      res.json({ success: true, user_id: this.lastID });
    }
  );
});

// Get all users
app.get("/api/users", (req, res) => {
  db.all("SELECT * FROM users ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      console.error("❌ Error fetching users:", err.message);
      return res.status(500).json({ error: "Database read failed" });
    }
    res.json(rows);
  });
});

// Get all exchange rates
app.get("/api/rates", (req, res) => {
  db.all("SELECT * FROM rates ORDER BY updated_at DESC", [], (err, rows) => {
    if (err) {
      console.error("❌ Error fetching rates:", err.message);
      return res.status(500).json({ error: "Database read failed" });
    }
    res.json(rows);
  });
});

// Add or update rate
app.post("/api/rates", (req, res) => {
  const { currency_from, currency_to, rate } = req.body;

  if (!currency_from || !currency_to || !rate) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.run(
    `INSERT INTO rates (currency_from, currency_to, rate) VALUES (?, ?, ?)`,
    [currency_from, currency_to, rate],
    function (err) {
      if (err) {
        console.error("❌ Error inserting rate:", err.message);
        return res.status(500).json({ error: "Database insert failed" });
      }
      res.json({ success: true, rate_id: this.lastID });
    }
  );
});

// =============================
// Start server
// =============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
