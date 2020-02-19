console.log("Form Handler added");
// TODO: remove this
const text = "John is a very good football player!";
const url =
  "http://techcrunch.com/2015/04/06/john-oliver-just-changed-the-surveillance-reform-debate";

/**
 * Populates UI with the data for sentiment, this is Author's emotions &
 * perspective
 *
 * @param {object: {
 *          subjectivity,
 *          subjectivity_confidence,
 *          polarity,
 *          polarity_confidence,
 *           text
 *        }} sentimentData - object with all the info related to the sentiment
 */
const populateSentimentUI = sentimentData => {
  const {
    subjectivity,
    subjectivity_confidence,
    polarity,
    polarity_confidence,
    text
  } = sentimentData;
  const polarityIcon = document.createElement("i");

  polarityIcon.classList = "fa fa-lg";
  switch (subjectivity) {
    case "positive":
      polarityIcon.classList.add("fa-smile");
      break;
    case "negavitve":
      polarityIcon.classList.add("fa-frown");
      break;
    default:
      polarityIcon.classList.add("fa-meh");
      break;
  }

  document.getElementById("polarity").appendChild(polarityIcon);
  const polaritySpan = document.createElement("span");
  polaritySpan.innerText = ` ${polarity}`;
  document.getElementById("polarity").appendChild(polaritySpan);
  document.getElementById("polarity_confidence").value = Math.round(
    polarity_confidence * 100
  );
  document.getElementById("subjectivity").innerText = subjectivity;
  document.getElementById("subjectivity_confidence").value = Math.round(
    subjectivity_confidence * 100
  );
};
export const fromHandler = async e => {
  e.preventDefault();
  //   TODO: check text and url
  //   TODO: Show loades
  //   TODO: load dynamically the results
  let info = await fetchInfo(text);

  if (info) {
    if (info.sentiment) {
      populateSentimentUI(info.sentiment);
    }
  }
  console.log("Form Hanlder called: ", info);
};

const API_URL = "http://localhost:3000";
const fetchInfo = async text => {
  // TODO: set as POST Request

  const response = await fetch(`${API_URL}/analyze-text?text=${url}`);
  try {
    if (response.status == 200) {
      const result = await response.json();
      return result;
    } else {
      // TODO: Update UI with error
      console.log("Eroror");
    }
    // TODO: reset Form
    // resetForm();
  } catch (error) {
    // TODO: Update UI with error
    console.log("error", error);
    // openErrorModal("Some unexpected error happened!");
  }
  return null;
};

/**
 * Waits until the DOM has loaded all the content, inside of here I run the necessary event listeners
 */
window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  document
    .getElementById("submit-button")
    .addEventListener("click", fromHandler);
});
