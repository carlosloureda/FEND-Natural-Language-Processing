console.log("Form Handler added");
// TODO: remove this
const text = "John is a very good football player!";
const url =
  "http://techcrunch.com/2015/04/06/john-oliver-just-changed-the-surveillance-reform-debate";

export const fromHandler = e => {
  e.preventDefault();
  //   TODO: check text and url
  //   TODO: Show loades
  //   TODO: load dynamically the results
  console.log("Form Hanlder called");
  fetchInfo(text);
};

const API_URL = "http://localhost:3000";
const fetchInfo = async text => {
  // TODO: set as POST Request

  const response = await fetch(`${API_URL}/analyze-text?text=${url}`);
  try {
    if (response.status == 200) {
      const result = await response.json();
      console.log("result: ", result);
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
