const router = require("express").Router();
const { check } = require("express-validator");
const textapi = require("../api/textapi");
const { validationResult } = require("express-validator");

const analyzeText = require("./analyze-text");
// req should have a text file
router.get("/analyze-text", require("./analyze-text"));

router.get("/", (req, res) => {
  console.log("[/] endpoint called");
  // res.sendFile("src/client/views//index.html");
  res.sendFile("/dist/index.html");
});

module.exports = router;
