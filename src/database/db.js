const sqlite3 = require("sqlite3").verbose();

module.exports.DbHandler = () => {
  // Connect to the SQLite database (or create it if it doesn't exist)
  const db = new sqlite3.Database("./jrla.db");

  // SQL query to create a table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ylityo (
        id INTEGER PRIMARY KEY,
        pvm DATE DEFAULT CURRENT_DATE,
        poikeama INTEGER DEFAULT 0,
        saldo INTEGER,
        selite TEXT default "Support"
    )
`;
  // Execute the query to create the table
  db.run(createTableQuery, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log("Table created successfully");

    // Close the database connection after the table is created
    db.close();
  });
};

exports = sqlite3