import { populateEmotionsSection } from "./populateBasicUI";

beforeAll(() => {
  document.body.innerHTML = `
    <div class="aylien-results__emotions__content" id="emotions">
      <h2>Here will appear the emotions results</h2>
    </div>
  `;
});

describe("#PopulateEmotionSection", () => {
  it("It appends the proper HTML", () => {
    populateEmotionsSection();
    const rows = document.querySelectorAll(
      ".aylien-results__emotions__content__row"
    );
    expect(rows.length).toEqual(2);
    expect(
      rows[0].querySelector(".aylien-results__emotions__content__row__title")
        .textContent
    ).toEqual("Tone");

    expect(
      rows[1].querySelector(".aylien-results__emotions__content__row__title")
        .textContent
    ).toEqual("Perspective");
  });
});
