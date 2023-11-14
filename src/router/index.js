const express = require("express");
const router = express.Router();

router.get("/alive", (req,res) => {
    res.send("Elossa ollaan").status(200).end()
});

router.get("/", (req,res) => {
    res.send("Olet ytimessä").status(200).end()
});

module.exports = router
    