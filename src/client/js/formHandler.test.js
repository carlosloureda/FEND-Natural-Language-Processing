import { fetchInfo } from "./formHandler";

describe("#API call `fetchInfo`", () => {
  it("It works with text", async () => {
    const text = "John is a very good football player";
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          new Promise((res, rej) => {
            let response = {
              sentiment: {
                polarity: "positive",
                subjectivity: "subjective",
                text: "John is a very good football player",
                polarity_confidence: 0.9824022650718689,
                subjectivity_confidence: 0.9963778207617525
              },
              categories: {
                text: "John is a very good football player",
                language: "en",
                categories: [
                  {
                    label: "sport - American football",
                    code: "15003000",
                    confidence: 1
                  }
                ]
              },
              hashtags: {
                text: "John is a very good football player",
                language: "en",
                hashtags: ["#AssociationFootball"]
              }
            };
            res(response);
          })
      })
    );

    let result = await fetchInfo(text);
    expect(result).toBeDefined();
    expect(result.sentiment).toBeDefined();
    expect(result.categories).toBeDefined();
    expect(result.hashtags).toBeDefined();

    expect(result.sentiment.polarity).toEqual("positive");
    expect(result.sentiment.subjectivity).toEqual("subjective");

    expect(result.categories.categories.length).toEqual(1);
    expect(result.categories.categories[0].label).toEqual(
      "sport - American football"
    );
    expect(result.hashtags.hashtags.length).toEqual(1);
    expect(result.hashtags.hashtags[0]).toEqual("#AssociationFootball");
  });

  it("It works with URL", async () => {
    const url =
      "http://techcrunch.com/2015/04/06/john-oliver-just-changed-the-surveillance-reform-debate";

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          new Promise((res, rej) => {
            let response = {
              sentiment: {
                polarity: "neutral",
                subjectivity: "subjective",
                text:
                  "John Oliver Just Changed The Surveillance Reform Debate ...",
                polarity_confidence: 0.7636680006980896,
                subjectivity_confidence: 1
              },
              categories: {
                text:
                  "John Oliver Just Changed The Surveillance Reform Debate ...",
                language: "en",
                categories: []
              },
              hashtags: {
                text:
                  "John Oliver Just Changed The Surveillance Reform Debate ...",
                language: "en",
                hashtags: [
                  "#Surveillance",
                  "#JohnOliver",
                  "#GlobalSurveillanceDisclosures",
                  "#EdwardSnowden",
                  "#BarackObama",
                  "#PatriotAct",
                  "#NetNeutrality",
                  "#FederalCommunicationsCommission",
                  "#LastWeekTonightWithJohnOliver",
                  "#TheGuardian",
                  "#TheWashingtonPost",
                  "#NavalReview",
                  "#UnitedStatesSenate",
                  "#HBO",
                  "#HBO",
                  "#Russia",
                  "#HotPockets",
                  "#Twitter",
                  "#Reddit",
                  "#YouTube",
                  "#FCC",
                  "#Internet",
                  "#CivilLiberties",
                  "#ExecutiveOrder12333",
                  "#ForeignIntelligenceSurveillanceAct",
                  "#Washington"
                ]
              },
              summary: {
                text:
                  "John Oliver Just Changed The Surveillance Reform Debate ...",
                sentences: [
                  "sentence 1",
                  "sentence 2",
                  "sentence 3",
                  "sentence 4",
                  "sentence 5"
                ]
              },
              extract: {
                author: "Cat Zakrzewski",
                feeds: [
                  "https://techcrunch.com/feed/",
                  "https://techcrunch.com/cooments/feed/",
                  "https://techcrunch.com/2015/04/06/john-oliver-just-changed-the-surveillance-reform-debate/feed/"
                ],
                videos: [
                  "https://www.youtube.com/embed/XEVlyP4_11M?version=3&rel=1&fs=1&autohide=2&showsearch=0&showinfo=1&iv_load_policy=1&wmode=transparent"
                ]
              }
            };
            res(response);
          })
      })
    );

    let result = await fetchInfo(url);
    expect(result).toBeDefined();
    expect(result.sentiment).toBeDefined();
    expect(result.categories).toBeDefined();
    expect(result.hashtags).toBeDefined();
    expect(result.summary).toBeDefined();
    expect(result.extract).toBeDefined();

    expect(result.sentiment.polarity).toEqual("neutral");
    expect(result.sentiment.subjectivity).toEqual("subjective");

    expect(result.categories.categories.length).toEqual(0);

    expect(result.hashtags.hashtags.length).toEqual(26);
    expect(result.hashtags.hashtags[0]).toEqual("#Surveillance");

    expect(result.summary.sentences.length).toEqual(5);

    expect(result.extract.author).toEqual("Cat Zakrzewski");
    expect(result.extract.feeds.length).toEqual(3);
    expect(result.extract.feeds[0]).toEqual("https://techcrunch.com/feed/");
    expect(result.extract.videos.length).toEqual(1);
    expect(result.extract.videos[0]).toEqual(
      "https://www.youtube.com/embed/XEVlyP4_11M?version=3&rel=1&fs=1&autohide=2&showsearch=0&showinfo=1&iv_load_policy=1&wmode=transparent"
    );
  });
});
