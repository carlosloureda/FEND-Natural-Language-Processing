const textapi = require("./api/textapi");

const url =
  "http://techcrunch.com/2015/04/06/john-oliver-just-changed-the-surveillance-reform-debate";
textapi.extract(url, (_, response) => {
  console.log(response);
});
