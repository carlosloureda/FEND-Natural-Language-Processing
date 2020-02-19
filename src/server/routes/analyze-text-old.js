const textapi = require("../api/textapi");
const { validationResult } = require("express-validator");

const analyzeText = async (req, res) => {
  // Validate data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { text } = req.query;
  //   TODO: Do the endpoint calls and fetch response ..

  console.log("[/analyze-text] endpoint called with `text`: ", text);
  console.log("req.query: ", req.query);
  try {
    let response = {
      sentiment: await endpointWrapper("sentiment", text),
      categories: await endpointWrapper("classify", text),
      summary: await endpointWrapper("summarize", text),
      hashtags: await endpointWrapper("hashtags", text),
      extract: await endpointWrapper("extract", text)
      // sentiment: await getSentiment(text),
      // categories: await getCategories(text),
      // summary: await getSummary(text),
      // hashtags: await getHashtags(text),
      // extract: await getExtract(text)
    };
    res.status(200).send(response);
  } catch (e) {
    console.log("error: ", e);
    // TODO: send error
    // res.status(422).send(`${error}`);
    res.status(404).send(`${e}`);
  }

  // res.status(200).send("Hello from the [/analyze-text] endpoint!");
  //   res.status(200).send("User entry properly saved");
};

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
const getSentiment = text => {
  return new Promise((resolve, reject) => {
    textapi.sentiment(text, (error, response) => {
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

const getCategories = url => {
  return new Promise((resolve, reject) => {
    textapi.classify(url, (error, response) => {
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

// TODO: provide url or text and title
const getSummary = text => {
  // cosnt
  return new Promise((resolve, reject) => {
    let params = { text, title: "aaaa" };
    textapi.summarize(params, (error, response) => {
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

// text or url and language
const getHashtags = text => {
  return new Promise((resolve, reject) => {
    textapi.hashtags(text, (error, response) => {
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

// url, html
const getExtract = url => {
  return new Promise((resolve, reject) => {
    // let params = { text, title: "aaaa" };
    textapi.extract(url, (error, response) => {
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
