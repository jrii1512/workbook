const sqlite3 = require("sqlite3").verbose();

exports.DbHandler = () => {
  // Connect to the SQLite database (or create it if it doesn't exist)
  const db = new sqlite3.Database("./jrla.db");

  // SQL query to create a table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS saldot (
        id INTEGER PRIMARY KEY,
        tunnit INTEGER
    )
`;
  // Execute the query to create the table
  db.run(createTableQuery, function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log("Table created successfully");

    // Close the database connection after the table is created
    db.close();
  });
};

exports.AddData = (saldo) => {
  const db = new sqlite3.Database("./jrla.db");

  const insertQuery = `INSERT INTO saldot (tunnit) VALUES (?)`;

  const values = [saldo];

  db.run(insertQuery, values, function (err) {
    if (err) {
      return console.error(err.message);
    }

    console.log(`A record has been inserted with rowid ${this.lastID}`);
  });
};
