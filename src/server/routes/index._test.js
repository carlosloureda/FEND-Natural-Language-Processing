const routes = require("./index.js");
const analyzeText = require("./analyze-text");

// https://codewithhugo.com/express-request-response-mocking/

const mockRequest = text => {
  return {
    body: { text: text }
  };
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("GET [/analyze-text]", () => {
  test("should return 200", async () => {
    const req = mockRequest({ text: "hugo" });
    const res = mockResponse();
    await analyzeText(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(
      "Hello from the [/analyze-text] endpoint!"
    );
  });
  //   Cannot call validators this ways
  //   test("should 422 if session data is not set", async () => {
  //     const req = {
  //       body: {}
  //     };
  //     const res = mockResponse();
  //     await analyzeText(req, res);
  //     expect(res.status).toHaveBeenCalledWith(422);
  //   });
});
