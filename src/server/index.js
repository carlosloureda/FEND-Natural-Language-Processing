const textapi = require("./api/textapi");

// const { check, validationResult } = require("express-validator");

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  console.log("[/] endpoint called");
  res.send("Hello from the server!");
});

// Setup Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server for NLP project: ${PORT}`);
  console.log(
    `Open http://localhost:${PORT}/ on your browser to see the app running`
  );
});
