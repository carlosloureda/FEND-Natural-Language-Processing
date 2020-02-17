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

const text = "John is a very good football player!";

const responseForText = {
  polarity: "positive",
  subjectivity: "objective",
  text,
  polarity_confidence: 0.9940106272697449,
  subjectivity_confidence: 0.943706847162803
};

describe("#TextAPI endpoints", () => {
  // Classification endpoint
  it("Classification with URL", () => {
    const url =
      "http://techcrunch.com/2015/07/16/microsoft-will-never-give-up-on-mobile";
    textapi.classify(url, (_, response) => {
      expect(response).toBeDefined();
      expect(response.language).toBeDefined();
      expect(response.language).toEqual("en");
      expect(response.categories).toBeDefined();
      expect(response.categories.length).toBeGreaterThan(0);
      expect(response.categories).toEqual([
        {
          label: "company information - marketing",
          code: "04016029",
          confidence: 0.11
        }
      ]);
    });
  });

  it("Classification with Text", () => {
    textapi.classify(text, (_, response) => {
      expect(response).toBeDefined();
      expect(response.language).toBeDefined();
      expect(response.language).toEqual("en");
      expect(response.categories).toBeDefined();
      expect(response.categories.length).toBeGreaterThan(0);
      expect(response.categories).toEqual([
        {
          label: "sport - American football",
          code: "15003000",
          confidence: 1
        }
      ]);
    });
  });

  it("Sentiment with text", () => {
    textapi.sentiment(text, (error, response) => {
      expect(response).toBeDefined();
      expect(response.polarity).toBeDefined();
      expect(response.subjectivity).toBeDefined();
      expect(response.text).toBeDefined();
      expect(response.text).toEqual(text);
      expect(response).toEqual(responseForText);
    });
  });

  it("Language Detection (with text) - Spanish", () => {
    let _text = "¡Me encanta Udacity y soy español!";
    textapi.language(_text, (_, response) => {
      expect(response).toBeDefined();
      expect(response.text).toEqual(_text);
      expect(response.lang).toEqual("es");
      expect(response.confidence).toBeDefined();
    });
  });

  it("Language Detection (with text) - English", () => {
    let _text = "I love Udacity!";
    textapi.language(_text, (_, response) => {
      expect(response).toBeDefined();
      expect(response.text).toEqual(_text);
      expect(response.lang).toEqual("en");
      expect(response.confidence).toBeDefined();
    });
  });

  it("Article extraction (with URL)", () => {
    const url =
      "http://techcrunch.com/2015/04/06/john-oliver-just-changed-the-surveillance-reform-debate";
    textapi.extract(url, (_, response) => {
      expect(response).toBeDefined();
      expect(typeof response.author).toBe("string");
      expect(typeof response.image).toBe("string");
      expect(Array.isArray(response.tags)).toBe(true);
      expect(response.article).toBeDefined();
      expect(typeof response.article).toBe("string");
      expect(Array.isArray(response.videos)).toBe(true);
      expect(typeof response.title).toBe("string");
      expect(Array.isArray(response.feeds)).toBe(true);
      expect(response.publishDate).toBeDefined();
    });
  });

  it("Article extraction (with URL)", () => {
    const url =
      "http://techcrunch.com/2015/04/06/john-oliver-just-changed-the-surveillance-reform-debate";

    textapi.summarize(url, (_, response) => {
      expect(response).toBeDefined();
      expect(response.sentences).toBeDefined();
      expect(response.text).toBeDefined();
      expect(Array.isArray(response.sentences)).toBe(true);
      expect(typeof response.text).toBe("string");
    });
  });
});
