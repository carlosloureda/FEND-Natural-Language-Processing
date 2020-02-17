const textapi = require("./textapi");

describe("#.dotenv config", () => {
  it(".dotenv file exists", () => {
    const fs = require("fs");
    expect(fs.existsSync("./.env")).toBeTruthy();
  });
  it(".dotenv has API_ID and API_KEY", () => {
    expect(process.env.API_ID).toBeDefined();
    expect(process.env.API_KEY).toBeDefined();
  });
});
