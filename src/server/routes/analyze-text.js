const textapi = require("../api/textapi");
const { validationResult } = require("express-validator");

const analyzeText = (req, res) => {
  // Validate data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { text } = req.query;
  //   TODO: Do the endpoint calls and fetch response ..

  console.log("[/analyze-text] endpoint called with `text`: ", text);
  console.log("req.query: ", req.query);
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
};
module.exports = analyzeText;
