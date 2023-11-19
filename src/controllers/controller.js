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

exports.AddWorkException = (pvm, poikkeama, newSaldo, selite) => {
  //const db = open();
  const db = new sqlite3.Database("./src/database/jrla.db");
  const insertQuery = `INSERT INTO ylityo (pvm, poikkeama, saldo, selite) VALUES (?,?,?,?)`;
  const values = [pvm, poikkeama, newSaldo, selite];

  //let cumSaldo = parseInt(poikkeama) + parseInt(saldo)

  db.run(insertQuery, [pvm, poikkeama, newSaldo, selite], function (err) {
    if (err) {
      return console.error(err);
    }
    console.log(`A record has been inserted with rowid ${this.lastID}`);
    console.log(`Row(s) inserted: ${this.changes}`);
  });

  //db.close();
  return 201;
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

exports.getSaldo = async (cb) => {
  const db = open();
  const str = `SELECT saldo FROM ylityo ORDER BY saldo DESC LIMIT 1`;
  db.get(str, (error, data) => {
    if (error) {
      throw error;
    } else {
      console.log("data: ", data?.saldo);
      cb(null, data?.saldo);
    }
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

exports.deleteRecord = (id) => {
  console.log("deleteRecord")
  const db = open();
  const str = `DELETE FROM ylityo WHERE id = ` + parseInt(id);

  db.run(str, function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`A record ${id} was deleted`);
  });

  db.close();
  return 201;
};

exports.getData = this.getData;
exports.getSaldo = this.getSaldo;
exports.AddData = this.AddData;
exports.deleleRecord = this.deleleRecord;
exports.AddWorkException = this.AddWorkException;
