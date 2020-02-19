const router = require("express").Router();

// req should have a text file
router.get("/analyze-text", require("./analyze-text"));

router.get("/", (req, res) => {
  console.log("[/] endpoint called");
  // res.sendFile("src/client/views//index.html");
  res.sendFile("/dist/index.html");
});

module.exports = router;
