import sayHi from "./api/textapi";
/**
 * API for using Aylien SDK for using NPL
 * - Use dotenv for credentials use
 * - Use the API
 */
const dotenv = require("dotenv");
dotenv.config();
/**
 * Aylien SDK configuration
 */

const check_aylien_credentials = () => {
  console.log(`Your API key is ${process.env.API_KEY}`);
};
check_aylien_credentials();

const aylien = require("aylien_textapi");

var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});
textapi.sentiment(
  {
    text: "John is a very good football player!"
  },
  function(error, response) {
    if (error === null) {
      console.log(response);
    } else {
      console.log(error);
    }
  }
);

sayHi();
