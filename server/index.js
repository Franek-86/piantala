const express = require("express");
var mysql = require("mysql");
const PORT = process.env.PORT || 3001;

const app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password: "russel14",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  // con.query("CREATE DATABASE mydb", function (err, result) {
  //   if (err) throw err;
  //   console.log("Database created");
  // });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
