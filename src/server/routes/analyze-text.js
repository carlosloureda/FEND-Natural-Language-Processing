const textapi = require("../api/textapi");
const { validationResult } = require("express-validator");
const { isURL } = require("../utils/utils");

// http://techcrunch.com/2015/04/06/john-oliver-just-changed-the-surveillance-reform-debate
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
    res.status(200).send(response);
  } catch (e) {
    console.log("** error: ", e);
    res.status(404).send(`${e}`);
  }
};

/**
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
 * hastags:
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
