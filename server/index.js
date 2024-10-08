const express = require("express");
var mysql = require("mysql");
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser"); // Import body-parser
const multer = require("multer");
const path = require("path");
const cors = require("cors"); // Import CORS
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAdmin = require("./middleware/isAdmin"); // Adjust the path as necessary
const app = express();

// Enable CORS for all routes
app.use(cors());

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Add this line to parse JSON bodies
app.use(express.json());

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "russel14",
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

// Configure multer to store files in 'uploads/' directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads")); // Ensure this path is correct
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`; // Generate a unique name
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

app.patch("/api/piantine/:id/status", isAdmin, (req, res) => {
  console.log("ciao");
  const { id } = req.params; // Get the plant ID from the URL
  const { status } = req.body; // Get the new status from the request body

  // Validate the status
  if (status !== "approved" && status !== "rejected") {
    return res.status(400).json({ message: "Invalid status" });
  }

  const sql = "UPDATE piantine SET status_piantina = ? WHERE id = ?";
  con.query(sql, [status, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }
    if (result.affectedRows === 0) {
      console.log(err);
      return res.status(404).json({ message: "Plant not found" });
    }
    res
      .status(200)
      .json({ message: `Plant ${id} updated to ${status} successfully!` });
  });
});

// app.patch("/api/piantine/:id/status", isAdmin, (req, res) => {
//   console.log("ciao");
//   const { id } = req.params; // Get the plant ID from the URL
//   const { status } = req.body; // Get the new status from the request body

//   // Validate the status
//   if (status !== "approved" && status !== "rejected") {
//     return res.status(400).json({ message: "Invalid status" });
//   }

//   const sql = "UPDATE piantine SET status_piantina = ? WHERE id = ?";
//   con.query(sql, [status, id], (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ message: "Server error" });
//     }
//     if (result.affectedRows === 0) {
//       console.log(err);
//       return res.status(404).json({ message: "Plant not found" });
//     }
//     res
//       .status(200)
//       .json({ message: `Plant ${id} updated to ${status} successfully!` });
//   });
// });

app.post("/api/pianta", upload.single("image"), (req, res) => {
  const { lat, lang, user_id } = req.body; // Extract lat, lang, user_id from the form

  // Handle file upload
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  const image_url = `/uploads/${req.file.filename}`; // The relative path to the uploaded file

  // Insert the record into the database
  const sql =
    "INSERT INTO piantine (lat, lang, image_url, user_id) VALUES (?, ?, ?, ?)";

  con.query(sql, [lat, lang, image_url, user_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    // Return a success response with the inserted record's ID
    res.status(201).json({
      message: "Item added successfully!",
      id: result.insertId,
      image_url, // Return the image URL for further use (optional)
    });
  });
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

app.post("/api/register-user", async (req, res) => {
  const { email, user_password, role } = req.body;

  // Validate role
  const validRoles = ["user", "admin"];
  const userRole = validRoles.includes(role) ? role : "user"; // Default to 'user' if invalid

  try {
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const sql =
      "INSERT INTO users (email, user_password, role) VALUES (?, ?, ?)";

    con.query(sql, [email, hashedPassword, userRole], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      const token = jwt.sign(
        { id: result.insertId, email: email, role: userRole },
        "your_jwt_secret_key",
        { expiresIn: "1h" }
      );

      res.status(201).json({
        message: "User registered successfully!",
        token,
      });
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

app.post("/api/login", (req, res) => {
  const { email, user_password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  con.query(sql, [email], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result[0];
    console.log("this", user);
    const passwordMatch = await bcrypt.compare(
      user_password,
      user.user_password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.user_id, email: user.email, role: user.role },
      "your_jwt_secret_key",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.user_id, email: user.email, role: user.role },
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
