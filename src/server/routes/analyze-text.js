const textapi = require("../api/textapi");
const { validationResult } = require("express-validator");
const { isURL } = require("../utils/utils");

/**
 * Route handler for [/analyze-text], it fetches 3 Aylien endpoints in the case
 * that the searched input is a text, and 5 endpoints in the case it is an URL. *
 * @param {object} req - The request object from express routing
 * @param {object} res - The response object from express routing
 * @return {object} - An object with 3 or 5 nested objects with the data fetched. See endpointWrapper doc for more details
 */
const analyzeText = async (req, res) => {
  // Validate data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { text } = req.query;

  console.log("[/analyze-text] endpoint called with `text`: ", text);
  try {
    let response = {
      sentiment: await endpointWrapper("sentiment", text),
      categories: await endpointWrapper("classify", text),
      hashtags: await endpointWrapper("hashtags", text)
    };
    if (isURL(text)) {
      response.summary = await endpointWrapper("summarize", text);
      response.extract = await endpointWrapper("extract", text);
    }
    console.log("response: ", response);
    res.status(200).send(response);
  } catch (e) {
    console.log("** error: ", e);
    res.status(404).send(`${e}`);
  }
};

/**
 * A wrapper to call the 5 endppints so I don't repeact myself writting 5 different calls with almost the same code.
 * sentiment:
 *  params: {
      text: string;
      url: string;
      mode?: string;
    }
 * classify:
    params: {
      text: string;
      url: string;
      language ?: string;
    }
 * summarize:
    params: {
      title: String,
      text: string;
      url: string;
      mode ?: string;
    }
 * hashtags:
    params: {
      text: string;
      url: string;
      language ?: string;
    }
 * extact:
  params: {
      url: string;
      html: string;
      best_image ?: boolean;
    }
 * @param {*} func
 * @param {*} params
 */

const endpointWrapper = (func, params) => {
  return new Promise((resolve, reject) => {
    // let params = { text, title: "aaaa" };
    textapi[func](params, (error, response) => {
      try {
        if (response && error === null) {
          resolve(response);
        } else {
          reject(error);
        }
      } catch (e) {
        reject(e);
      }
    });
  });
};

module.exports = analyzeText;
