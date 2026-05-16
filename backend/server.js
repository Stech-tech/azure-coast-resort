
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

/* ---------------- TEST ROUTE ---------------- */
app.get("/", (req, res) => {
  res.send("Azure Coast Backend is running 😎");
});

/* ---------------- TEST INSERT ---------------- */
app.get("/test", (req, res) => {
  const sql = `
    INSERT INTO messages (sender, email, message)
    VALUES (?, ?, ?)
  `;

  db.run(
    sql,
    ["BrowserUser", "test@gmail.com", "Hello from browser"],
    function (err) {
      if (err) {
        return res.json({ error: err.message });
      }

      res.json({
        status: "inserted",
        id: this.lastID
      });
    }
  );
});

/* ---------------- SAVE MESSAGE ---------------- */
app.post("/messages", (req, res) => {
  const { sender, email, message } = req.body;

  const sql = `
    INSERT INTO messages (sender, email, message)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [sender, email, message], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      id: this.lastID,
      sender,
      email,
      message,
      status: "saved 😎"
    });
  });
});

/* ---------------- GET ALL MESSAGES ---------------- */
app.get("/messages", (req, res) => {
  const sql = `SELECT * FROM messages ORDER BY id DESC`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});

app.delete("/messages/:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM messages WHERE id = ?`;

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      status: "deleted 😎",
      id: id
    });
  });
});

/* ---------------- START SERVER ---------------- */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});