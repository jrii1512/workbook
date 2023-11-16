const sqlite3 = require("sqlite3").verbose();
const { DbHandler } = require("../database/db");

DbHandler();

const open = () => {
  const db = new sqlite3.Database("./src/database/jrla.db", (error) => {
    if (error) {
      console.log("Db is not open. Error: ", error);
      return;
    } else {
      console.log("Connected");
    }
  });
  return db;
};

exports.AddData = (saldo) => {
  const db = open();
  const insertQuery = `INSERT INTO saldot (tunnit) VALUES (?)`;
  const values = [saldo];

  db.run(insertQuery, values, function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`A record has been inserted with rowid ${this.lastID}`);
  });

  db.close();
};

exports.getData = async (cb) => {
  const db = open();
  const str = `SELECT tunnit FROM saldot ORDER BY tunnit DESC LIMIT 1`;
  db.all(str, [], (error, rows) => {
    console.log("getting data or trying");
    if (error) {
      throw error;
    } else {
      console.log("next forEach");
      rows.forEach((row) => {
        console.log("simulated data");
      });
      console.log("After forEach");
      cb(null, rows);
    }
  });
  db.close();
};

exports.getData = this.getData;
exports.AddData = this.AddData;
