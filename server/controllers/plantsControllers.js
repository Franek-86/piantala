const con = require("../config/db");

exports.getAllPlants = (req, res) => {
  const sql = "SELECT * FROM piantine";
  con.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

exports.addPlant = (req, res) => {
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
    console.log("yo", user_id);
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
};

exports.updateStatus = (req, res) => {
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
};

exports.getUserPlants = (req, res) => {
  console.log("ciao");
  const { userId } = req.query;
  // first get the id from local storage and set in in a varialble here
  const sql = "SELECT * FROM piantine WHERE user_id = ?";
  con.query(sql, userId, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
};
