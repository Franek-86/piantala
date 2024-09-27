const express = require("express");
var mysql = require("mysql");
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser"); // Import body-parser
const cors = require("cors"); // Import CORS

const app = express();
app.use(express.json()); // Add this line to parse JSON bodies
app.use(cors()); // Enable CORS for all routes
// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password: "",
  database: "ti_pianto_per_amore",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  // con.query("SHOW databases", function (err, result) {
  //   if (err) throw err;
  //   console.log(result);
  // });
});

// Create an API route to fetch data
app.get("/api/data", (req, res) => {
  const sql = "SELECT * FROM users";
  con.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log(results);
    res.json(results);
  });
});
app.get("/api/piantine", (req, res) => {
  const sql = "SELECT * FROM piantine";
  con.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log(results);
    res.json(results);
  });
});
app.post("/api/pianta", (req, res) => {
  const { lat, lang, image_url, user_id } = req.body; // Adjust these based on your table's columns
  const sql =
    "INSERT INTO piantine (lat, lang, image_url, user_id) VALUES (?, ?, ?,?)";

  con.query(sql, [lat, lang, image_url, user_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res
      .status(201)
      .json({ message: "Item added successfully!", id: result.insertId });
  });
});
app.post("/api/user", (req, res) => {
  const { email, user_password } = req.body; // Adjust these based on your table's columns
  const sql = "INSERT INTO users (email, user_password) VALUES (?, ?)";

  con.query(sql, [email, user_password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res
      .status(201)
      .json({ message: "Item added successfully!", id: result.insertId });
  });
});

app.delete("/api/piantine/:id", (req, res) => {
  const { id } = req.params; // Extract the ID from the request parameters
  const sql = "DELETE FROM piantine WHERE id = ?"; // Adjust this SQL to match your table's schema

  con.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted successfully!" });
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
