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

/**
 * Populates UI with the data for hashtags
 * @param {array} hashtags - object with all the hashtags
 */
const populateHashtagsUI = hashtags => {
  const hashtagsWrapper = document.getElementById("hastags");
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
 * @param {array} categories - array with all the categories
 */
const populateCategoriesUI = categories => {
  const categoriesWrapper = document.getElementById("categories");
  if (!categories.length) {
    // TODO: add some styling to this
    categoriesWrapper.innerText = "No categories found for this text ...";
    return;
  }

  categories.forEach(hashtag => {
    const el = document.createElement("span");
    el.classList = "chip";
    el.innerText = hashtag;
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
      // el.classList = "chip";
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

/**
 * Handles all the events related to the form submission
 * @param {event} e - The event fired on click on the form submit
 */
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
