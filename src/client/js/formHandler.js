import { openErrorModal } from "./modalHandler";

// TODO: Show the input text/url
const resetForm = () => {
  document.getElementById("aylien-form__input").value = "";
  document.getElementById("submit-button").disabled = true;
};
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

  document.getElementById("polarity").innerText = ""; //reset previous
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

/**
 * Populates UI with the data for hashtags
 * @param {array} hashtags - object with all the hashtags
 */
const populateHashtagsUI = hashtags => {
  const hashtagsWrapper = document.getElementById("hastags");
  hashtagsWrapper.innerText = "";
  if (!hashtags.length) {
    // TODO: add some styling to this
    hashtagsWrapper.innerText = "No hashtags found for this text ...";
    return;
  }

  hashtags.forEach(hashtag => {
    const el = document.createElement("span");
    el.classList = "chip";
    el.innerText = hashtag;
    hashtagsWrapper.appendChild(el);
  });
};

/**
 * Populates UI with the data for categories
 * @param {array} categories - array with all the categories objects
 */
const populateCategoriesUI = categories => {
  const categoriesWrapper = document.getElementById("categories");
  categoriesWrapper.innerText = "";
  if (!categories.length) {
    // TODO: add some styling to this
    categoriesWrapper.innerText = "No categories found for this text ...";
    return;
  }

  categories.forEach(hashtag => {
    const el = document.createElement("span");
    el.classList = "chip";
    el.innerText = hashtag.label;
    categoriesWrapper.appendChild(el);
  });
};

/**
 * Populates UI with the data for summary
 * @param {object:{text, sentences}} categories - object with all the summary
 */
const populateSummaryUI = summary => {
  const { text, sentences } = summary;

  const summaryWrapper = document.getElementById("summary");
  if (sentences) {
    sentences.forEach(sentence => {
      const el = document.createElement("p");
      el.innerText = sentence;
      summaryWrapper.appendChild(el);
    });
  } else {
    const el = document.createElement("p");
    summaryWrapper.appendChild(el);
  }
};

/**
 * Populates UI with the data for extract
 * @param {object:{author, feeds, video}} extract - object with all the extract
 */
const populateExtractUI = extract => {
  const { author, feeds, videos } = extract;

  document.getElementById("author").innerText = author;

  const feedsWrapper = document.getElementById("feeds");
  feeds.forEach(feed => {
    const el = document.createElement("p");
    const anchor = document.createElement("a");
    anchor.href = feed;
    anchor.innerText = feed;
    el.appendChild(anchor);
    feedsWrapper.appendChild(el);
  });

  const videosWrapper = document.getElementById("videos");
  videos.forEach(video => {
    const iframe = document.createElement("iframe");
    iframe.classList = "video-iframe";
    iframe.src = video;
    videosWrapper.appendChild(iframe);
  });
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
    if (info.summary) {
      populateSummaryUI(info.summary);
    }
    if (info.extract) {
      populateExtractUI(info.extract);
    }
    resetForm();
  }
  hideLoading();
  console.log("Form Hanlder called: ", info);
};

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
