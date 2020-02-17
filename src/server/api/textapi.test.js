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

describe("#TextAPI endpoints", () => {
  it("Getting sentiment", () => {
    const _response = {
      polarity: "positive",
      subjectivity: "objective",
      text: "John is a very good football player!",
      polarity_confidence: 0.9940106272697449,
      subjectivity_confidence: 0.943706847162803
    };
    const text = "John is a very good football player!";

    textapi.sentiment(text, (error, response) => {
      expect(response).toBeDefined();
      expect(response.polarity).toBeDefined();
      expect(response.subjectivity).toBeDefined();
      expect(response.text).toBeDefined();
      expect(response.text).toEqual(text);
      expect(response).toEqual(_response);
    });
  });
});
