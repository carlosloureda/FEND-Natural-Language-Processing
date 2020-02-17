const router = require("express").Router();
const { check } = require("express-validator");
const textapi = require("../api/textapi");
const { validationResult } = require("express-validator");
router.get("/", (req, res) => {
  console.log("[/] endpoint called");
  res.send("Hello from the server!");
});
const analyzeText = require("./analyze-text");
// req should have a text file
router.get("/analyze-text", (req, res) => {
  // Validate data
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(422).json({ errors: errors.array() });
  //   }
  const { text } = req.params;
  //   TODO: Do the endpoint calls and fetch response ..

  console.log("[/analyze-text] endpoint called with `text`: ", text);
  console.log("req.parms: ", req.parms);
  textapi.sentiment(text, (error, response) => {
    try {
      if (error === null) {
        console.log("response: ", response);
      }
    } catch (e) {
      console.log("error: ", e);
    }
  });

  res.status(200).send("Hello from the [/analyze-text] endpoint!");
  //   res.status(200).send("User entry properly saved");
});

module.exports = router;
