//const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const {
  getData,
  getSaldo,
  AddWorkException,
  AddData,
} = require("../controllers/controller");

router.get("/alive", (req, res) => {
  res.send("Elossa ollaan").status(200).end();
});

router.get("/", (req, res) => {
  res.send("Olet ytimessä").status(200).end();
});

router.get("/api/getSaldo", async (req, res) => {
  getSaldo((error, data) => {
    if (error) {
      console.log("Error: ");
    }
    console.log("data in router/index: ", data);
    return res.json(data);
  });
});

/*
router.get("/api/getSaldo", async (req, res) => {
  getData((error, data) => {
    if (error) {
      return res.send(error);
    }
    console.log("data in router/index: ", data);
    return res.json(data);
  });
});
*/

router.post("/api/addDate", async (req, res) => {
  const { pvm, poikkeama, saldo, selite } = await req?.body;
  console.log(pvm, poikkeama, saldo, selite);

  const insertStatus = AddWorkException(pvm, poikkeama, saldo, selite);
  res.sendStatus(insertStatus);
});

module.exports = router;
