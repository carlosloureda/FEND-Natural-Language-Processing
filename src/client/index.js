import "./styles/resets.scss";
import "./styles/index.scss";
import "./styles/modal.scss";
import "./styles/loaders.scss";

import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import { fromHandler } from "./js/formHandler";
import { errorModalHandler, openErrorModal } from "./js/modalHandler";
import { showDevConsoleInstructions } from "./js/instructions";
import {
  populateSummarySection,
  populateEmotionsSection,
  showCopyRightYear
} from "./js/populateBasicUI";

/**
 * Checks the existance of env variables for my server endpoints
 */
const checkEnvironmentVariables = () => {
  if (!process.env.SERVER_BASE_URL && !process.env.SERVER_PORT) {
    openErrorModal(
      `There isn't a .env file where I can fetch the server URL and its PORT.
      Please see README.md
      `
    );
  }
};

/**
 * Registers the servide worker when we are on production environment (webpack config)
 * TIP: If you run this once as production and want to come back to dev you need to unregister this service worker over the browser developer console.
 */
const registerServiceWorkers = () => {
  if (process.env.NODE_ENV === "production") {
    if ("serviceWorker" in navigator) {
      // Use the window load event to keep the page load performant
      navigator.serviceWorker.register("/service-worker.js");
    }
  }
};

/**
 * Waits until the DOM has loaded all the content, inside of here I run the necessary event listeners
 */
window.addEventListener("DOMContentLoaded", () => {
  showCopyRightYear();

  // Submit button handler
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

  errorModalHandler();
  showDevConsoleInstructions();
  registerServiceWorkers();
  checkEnvironmentVariables();
});
