// Require Express to run server and routes
const app = require("express")();
const routes = require("./routes");

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

app.use("/", routes);
// Setup Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server for NLP project: ${PORT}`);
  console.log(
    `Open http://localhost:${PORT}/ on your browser to see the app running`
  );
});
