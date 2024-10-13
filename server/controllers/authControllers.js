const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const con = require("../config/db");

exports.registerUser = async (req, res) => {
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
};

exports.loginUser = (req, res) => {
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

    // Set user info in session
    req.session.user = { id: user.user_id, email: user.email, role: user.role };

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
};

exports.logoutUser = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
};

// to be checked if needed
exports.getAllUsers = (req, res) => {
  const sql = "SELECT * FROM users";
  con.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
};
