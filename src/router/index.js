const express = require("express");
const router = express.Router();
const { getData } = require("../controllers/controller");

router.get("/alive", (req, res) => {
  res.send("Elossa ollaan").status(200).end();
});

router.get("/", (req, res) => {
  res.send("Olet ytimessä").status(200).end();
});

router.get("/api/getSaldo", async (req, res) => {
  getData((error, data) => {
    if (error) {
      return res.send(error);
    }
    console.log("data in router/index: ", data[0].tunnit)
    return res.json(data[0].tunnit);
  });


});


module.exports = router;
