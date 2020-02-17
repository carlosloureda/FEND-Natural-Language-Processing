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

const textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

module.exports = textapi;
