const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const cors = require("cors"); // Import CORS
const bodyParser = require("body-parser"); // Import body-parser
const plantsRoutes = require("./routes/plantsRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = process.env.PORT || 3001;

// ---------
// ---------
// ---------
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// ---------
const sessionStore = new MySQLStore({}, require("./config/db"));

app.use(
  session({
    key: "user_sid",
    secret: "your_secret_key", // Change this to a strong secret
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000, // Set cookie expiration time (in milliseconds)
    },
  })
);

app.use("/api/plants", plantsRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// app.delete("/api/piantine/:id", (req, res) => {
//   const { id } = req.params; // Extract the ID from the request parameters
//   const sql = "DELETE FROM piantine WHERE id = ?"; // Adjust this SQL to match your table's schema

//   con.query(sql, [id], (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send(err);
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Item not found" });
//     }
//     res.json({ message: "Item deleted successfully!" });
//   });
// });
