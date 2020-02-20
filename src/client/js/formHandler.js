import { openErrorModal } from "./modalHandler";
import {
  populateSentimentUI,
  populateHashtagsUI,
  populateCategoriesUI,
  populateSummaryUI,
  populateExtractUI
} from "./populateBasicUI";

/**
 * Resets the Form, clearing the input and disabling the button
 */
const resetForm = () => {
  document.getElementById("aylien-form__input").value = "";
  document.getElementById("submit-button").disabled = true;
};

/**
 * Manages the UI for Loading effects
 * - Updates the button to a loading style
 * - Shows 3 loaders for each of the categories sections
 */
const showLoading = () => {
  // Button
  let submitBtn = document.getElementById("submit-button");
  submitBtn.classList.toggle("loading");

  submitBtn.innerText = "Analyzing  ";
  const loadingIcon = document.createElement("i");
  loadingIcon.classList = "fa fa-spinner fa-spin fa-lg";
  submitBtn.appendChild(loadingIcon);

  const loaderHTML = `<div class="loader"></div>`;
  const loader = document.createElement("div");

  // Emotions
  document.getElementById("emotions").innerHTML = loaderHTML;

  // Categories
  loader.classList = "loader";
  document
    .getElementById("categories")
    .parentNode.parentNode.appendChild(loader);

  if (document.getElementById("categories")) {
    document.getElementById("categories").innerHTML = "";
    document.getElementById("hashtags").innerHTML = "";
  }

  // Suummary
  document.getElementById("summary-content").innerHTML = loaderHTML;
};

/**
 * Manages the UI for removing thge loading effects
 * - Updates the button to a clickable
 * - Removes the 3 loaders for each of the categories sections
 */
const hideLoading = () => {
  // Button
  let submitBtn = document.getElementById("submit-button");
  submitBtn.classList.toggle("loading");
  submitBtn.innerText = "Analyze!";

  // Loaders
  document.querySelectorAll(".loader").forEach(loader => loader.remove());
};

/**
 * Handles all the events related to the form submission
 * @param {event} e - The event fired on click on the form submit
 */
export const fromHandler = async e => {
  e.preventDefault();

  showLoading();

  const text = document.getElementById("aylien-form__input").value;
  let info = await fetchInfo(text);

  hideLoading();

  if (info) {
    if (info.sentiment) {
      populateSentimentUI(info.sentiment);
    }
    if (info.categories) {
      populateCategoriesUI(info.categories.categories);
    }
    if (info.hashtags) {
      populateHashtagsUI(info.hashtags.hashtags);
    }
    populateSummaryUI(info.summary, text);
    if (info.extract) {
      populateExtractUI(info.extract);
    }
    resetForm();
  }
};

/**
 * Queries the server endpoint with the text/url provided by the user and
 * manages to update the UI (calling another function) *
 *
 * @param {string} text - The text or URL to analyze
 */
export const fetchInfo = async text => {
  const API_URL = `${process.env.SERVER_BASE_URL}:${process.env.SERVER_PORT}`;
  const response = await fetch(`${API_URL}/analyze-text?text=${text}`);
  try {
    if (response.status == 200) {
      const result = await response.json();
      return result;
    } else {
      openErrorModal(
        `Failed to fetch ${API_URL}/analyze-text?text=${text}:  ${response.status}, ${response.statusText}`
      );
    }
  } catch (error) {
    console.log("error: ", error);
    openErrorModal(
      `Some unexpected error happened while fetching ${API_URL}/analyze-text?text=${text}`
    );
  }

  return false;
};
