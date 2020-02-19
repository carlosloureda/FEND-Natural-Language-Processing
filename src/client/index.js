import "./styles/resets.scss";
import "./styles/index.scss";
import "./styles/modal.scss";

import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import { fromHandler } from "./js/formHandler";
import { errorModalHandler, openErrorModal } from "./js/modalHandler";
import { showDevConsoleInstructions } from "./js/instructions";
import {
  populateSummarySection,
  populateEmotionsSection
} from "./js/populateBasicUI";
/**
 * Appends on footer the actual year :D
 */
const showCopyRightYear = () => {
  document.getElementById(
    "copyright-year"
  ).innerText = `©${new Date().getFullYear()}`;
};

/**
 * Waits until the DOM has loaded all the content, inside of here I run the necessary event listeners
 */
window.addEventListener("DOMContentLoaded", () => {
  showCopyRightYear();
  document
    .getElementById("submit-button")
    .addEventListener("click", fromHandler);

  // Manage enable/disable of the submit button
  document.getElementById("submit-button").disabled = true;
  document.getElementById("aylien-form__input").addEventListener("input", e => {
    document.getElementById("submit-button").disabled = e.target.value
      ? false
      : true;
  });

  // Modal handler
  errorModalHandler();

  showDevConsoleInstructions();
  console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") {
    console.log("HEY!");

    if ("serviceWorker" in navigator) {
      // Use the window load event to keep the page load performant
      // navigator.serviceWorker.register("/service-worker.js");
    }
  }

  // populateSummarySection();
  // populateEmotionsSection();
});
