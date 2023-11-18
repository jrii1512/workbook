//const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const {
  getData,
  getSaldo,
  AddWorkException,
  AddData,
  deleteRecord
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


router.get("/api/getData", async (req, res) => {
  getData((error, data) => {
    if (error) {
      return res.send(error);
    }
    console.log("data in router/index: ", data);
    return res.json(data);
  });
});


router.post("/api/addDate", async (req, res) => {
  const { pvm, poikkeama, newSaldo, selite } = await req?.body;
  console.log(pvm, poikkeama, newSaldo, selite);

  const insertStatus = AddWorkException(pvm, poikkeama, newSaldo, selite);
  res.sendStatus(insertStatus);
});

router.delete("/api/delete", async (req, res) => {
   console.log(req.body)
  const { params } = await req?.body;
  console.log("params: ", params)
  const delResponse = deleteRecord(params.id);
  res.sendStatus(delResponse);
});

module.exports = router;
