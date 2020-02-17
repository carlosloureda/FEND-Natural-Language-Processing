/**
 * For managing secrets
 */
const dotenv = require("dotenv");
dotenv.config();

/**
 * Aylien SDK configuration
 */
var aylien = require("aylien_textapi");
// set aylien API credentias
var textapi = new aylien({
  application_id: "your-api-id",
  application_key: "your-key"
});

const check_aylien_credentials = () => {
  console.log(`Your API key is ${process.env.API_KEY}`);
};

check_aylien_credentials();
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});
