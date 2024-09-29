const express = require("express");
var mysql = require("mysql");
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser"); // Import body-parser
const cors = require("cors"); // Import CORS
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

app.post("/api/register-user", async (req, res) => {
  const { email, user_password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const sql = "INSERT INTO users (email, user_password) VALUES (?, ?)";

    con.query(sql, [email, hashedPassword], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      // Only create token after successful database insertion
      const token = jwt.sign(
        { id: result.insertId, email: email }, // Payload data (id, email, etc.)
        "your_jwt_secret_key", // Secret key
        { expiresIn: "1h" } // Expiration time
      );

      // Send the token to the frontend
      res.status(201).json({
        message: "User registered successfully!",
        token: token, // Send the token in the response
      });
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

app.post("/api/login", (req, res) => {
  const { email, user_password } = req.body;

  // Query to find the user by email
  const sql = "SELECT * FROM users WHERE email = ?";

  con.query(sql, [email], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    // Check if the user was found
    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result[0];
    console.log("this", user);

    // Compare the password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(
      user_password,
      user.user_password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If login is successful, you can generate a token (JWT) for authentication
    const token = jwt.sign(
      { id: user.user_id, email: user.email }, // Payload data (like user ID, etc.)
      "your_jwt_secret_key", // Your secret key
      { expiresIn: "1h" } // Token expiration time
    );

    // Send back the token and user data if login is successful
    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.user_id, email: user.email },
    });
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
