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

exports.AddWorkException = (pvm, poikkeama, saldo, selite) => {
  const db = open();
  const insertQuery = `INSERT INTO ylityo (poikkeama) VALUES (?,?,?,?)`;
  const values = [pvm, poikkeama, saldo, selite];

  db.run(insertQuery, values, function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`A record has been inserted with rowid ${this.lastID}`);
  });

  db.close();
};

exports.AddSaldo = (saldo) => {
  const db = open();
  const insertQuery = `INSERT INTO ylityo (saldo) VALUES (?)`;
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
  const str = `SELECT * FROM ylityo`;
  db.all(str, [], (error, rows) => {
    if (error) {
      throw error;
    } else {
      rows.forEach((row) => {
        console.log("simulated data");
      });
      cb(null, rows);
    }
  });
  db.close();
};

exports.getData = this.getData;
exports.AddData = this.AddData;
exports.AddWorkException = this.AddWorkException;
