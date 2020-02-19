import { openErrorModal } from "./modalHandler";
import {
  populateSentimentUI,
  populateHashtagsUI,
  populateCategoriesUI,
  populateSummaryUI,
  populateExtractUI
} from "./populateBasicUI";

const resetForm = () => {
  document.getElementById("aylien-form__input").value = "";
  document.getElementById("submit-button").disabled = true;
};

const showLoading = () => {
  let submitBtn = document.getElementById("submit-button");
  submitBtn.classList.toggle("loading");

  submitBtn.innerText = "Analyzing  ";
  const loadingIcon = document.createElement("i");
  loadingIcon.classList = "fa fa-spinner fa-spin fa-lg";
  submitBtn.appendChild(loadingIcon);
};

const hideLoading = () => {
  let submitBtn = document.getElementById("submit-button");
  submitBtn.classList.toggle("loading");
  submitBtn.innerText = "Analyze!";
};
/**
 * Handles all the events related to the form submission
 * @param {event} e - The event fired on click on the form submit
 */
export const fromHandler = async e => {
  e.preventDefault();
  //   TODO: Show loades
  showLoading();
  const text = document.getElementById("aylien-form__input").value;
  let info = await fetchInfo(text);

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
  hideLoading();
  console.log("Form Hanlder called: ", info);
};

// TODO: set the PORT from env
const API_URL = "http://localhost:3000";

export const fetchInfo = async text => {
  const response = await fetch(`${API_URL}/analyze-text?text=${text}`);
  // console.log("The response is: ", response);
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
