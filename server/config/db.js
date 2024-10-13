var mysql = require("mysql");
const dbOptions = {
  host: "localhost",
  user: "root",
  password: "russel14",
  database: "ti_pianto_per_amore",
};

const con = mysql.createConnection(dbOptions);

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;
