const con = require("../config/db");

exports.addPlant = (req, res) => {
  const { lat, lang, user_id } = req.body; // Extract lat, lang, user_id from the form
  console.log("test555", user_id);
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

exports.updateOwner = (req, res) => {
  const { id, owner_id, comment, plantType, status, purchase_date } = req.body; // Get the new status from the request body
  console.log(
    "test345",
    id,
    owner_id,
    comment,
    plantType,
    status,
    purchase_date
  );

  const sql =
    "UPDATE piantine SET owner_id = ?, plant_type = ?, user_comment = ?, status_piantina = ?, purchase_date = ? WHERE id = ?";
  con.query(
    sql,
    [owner_id, plantType, comment, status, purchase_date, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
      }
      if (result.affectedRows === 0) {
        console.log(err);
        return res.status(404).json({ message: "Plant not found" });
      }
      res.status(200).json({
        message: `Plant ${id} ownership updated successfully, owner id is ${owner_id}`,
      });
    }
  );
  return "test";
};
exports.updateStatus = (req, res) => {
  const { id } = req.params; // Get the plant ID from the URL
  const { status, rejection_comment } = req.body; // Get the new status and rejection comment from the request body
  console.log("comment", rejection_comment);

  // Validate the status
  if (status !== "approved" && status !== "rejected") {
    return res.status(400).json({ message: "Invalid status" });
  }

  // Prepare the SQL query
  let sql = "UPDATE piantine SET status_piantina = ?";
  const params = [status];

  // If rejection_comment is defined, add it to the update query
  if (rejection_comment !== undefined) {
    sql += ", rejection_comment = ?";
    params.push(rejection_comment);
  }

  sql += " WHERE id = ?";
  params.push(id);

  con.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res
      .status(200)
      .json({ message: `Plant ${id} updated to ${status} successfully!` });
  });
};

exports.deletePlant = (req, res) => {
  const { id } = req.params; // Get the plant ID from the URL

  // Validate the status

  const sql = "DELETE FROM piantine WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }
    if (result.affectedRows === 0) {
      console.log(err);
      return res.status(404).json({ message: "Plant not found" });
    }
    res.status(200).json({ message: `Plant ${id} successfully deleted!` });
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

exports.getOwnedPlants = (req, res) => {
  console.log("ciao dal get owned plants", req.query.ID);
  const ownerID = req.query.ID;
  const sql = "select * from piantine where owner_id = ?";
  con.query(sql, ownerID, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
};