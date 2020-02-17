const textapi = require("./api/textapi");

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
