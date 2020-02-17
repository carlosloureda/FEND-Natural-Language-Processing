const router = require("express").Router();
const { check } = require("express-validator");
const textapi = require("../api/textapi");
const { validationResult } = require("express-validator");

const analyzeText = require("./analyze-text");
// req should have a text file
router.get("/analyze-text", require("./analyze-text"));

router.get("/", (req, res) => {
  console.log("[/] endpoint called");
  res.send("Hello from the server!");
});

module.exports = router;
