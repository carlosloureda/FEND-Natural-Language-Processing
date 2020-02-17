const router = require("express").Router();
const { check } = require("express-validator");

router.get("/", (req, res) => {
  console.log("[/] endpoint called");
  res.send("Hello from the server!");
});

// req should have a text file
router.get(
  "/analyze-text",
  [
    check("text").isString(),
    check("text")
      .not()
      .isEmpty()
  ],
  require("./analyze-text")
);

module.exports = router;
