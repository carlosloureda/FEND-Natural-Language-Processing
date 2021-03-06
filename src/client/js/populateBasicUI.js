import { isURL } from "./utils";

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
export const populateSentimentUI = sentimentData => {
  populateEmotionsSection();
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
export const populateHashtagsUI = hashtags => {
  const hashtagsWrapper = document.getElementById("hashtags");
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
export const populateCategoriesUI = categories => {
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
export const populateSummaryUI = (summary, originalSearch) => {
  // populateSummarySection();

  const summaryWrapper = document.getElementById("summary-content");

  // Create the summary section
  const summaryDiv = document.createElement("div");
  summaryDiv.id = "summary";

  let searchIsURL = isURL(originalSearch);
  originalSearch = searchIsURL
    ? `<a href="${originalSearch}">${originalSearch}</a>`
    : `<span>${originalSearch}</span>`;
  summaryDiv.innerHTML = `
      <p>The ${
        searchIsURL ? "URL" : "text"
      } searched was:  ${originalSearch}</p>
    `;
  summaryWrapper.textContent = "";
  summaryWrapper.appendChild(summaryDiv);

  if (summary) {
    const { text, sentences } = summary;
    // Append results
    if (sentences) {
      sentences.forEach(sentence => {
        const el = document.createElement("p");
        el.innerText = sentence;
        summaryWrapper.appendChild(el);
      });
    } else if (text) {
      const el = document.createElement("p");
      el.innerText = text;
      summaryWrapper.appendChild(el);
    }
  }
};

/**
 * Populates UI with the data for extract
 * @param {object:{author, feeds, video}} extract - object with all the extract
 */
export const populateExtractUI = extract => {
  const { author, feeds, videos } = extract;

  const summarySection = document.getElementById("summary-content");

  if (author) {
    // Create the author section
    const authorSection = document.createElement("div");
    authorSection.innerHTML = `
        <h3>Author:</h3>
        <p id="author">${author}</p>
      `;
    summarySection.appendChild(authorSection);
  }

  if (feeds) {
    // Create the feeds section
    const feedsSection = document.createElement("div");
    feedsSection.innerHTML = `
      <h3>Feeds:</h3>
      <div id="feeds"></div>
      `;
    summarySection.appendChild(feedsSection);

    //  Populate it
    const feedsWrapper = document.getElementById("feeds");
    feeds.forEach(feed => {
      const el = document.createElement("p");
      const anchor = document.createElement("a");
      anchor.href = feed;
      anchor.innerText = feed;
      el.appendChild(anchor);
      feedsWrapper.appendChild(el);
    });
  }

  if (videos) {
    // Create the videos section
    const feedsSection = document.createElement("div");
    feedsSection.innerHTML = `
      <div class="aylien-results__summary__videos" id="videos-wrapper">
        <h3>Videos:</h3>
        <div id="videos"></div>
      </div>
      `;
    summarySection.appendChild(feedsSection);

    //  Populate it
    const videosWrapper = document.getElementById("videos");
    videos.forEach(video => {
      const iframe = document.createElement("iframe");
      iframe.classList = "video-iframe";
      iframe.src = video;
      videosWrapper.appendChild(iframe);
    });
  }
};

/**
 * Helper function to populate the basic HTML for the emotions so I can handle * intial data, loaders and other things
 */
export const populateEmotionsSection = () => {
  const emotions = document.getElementById("emotions");

  emotions.innerHTML = `

      <div class="aylien-results__emotions__content__row">
          <p class="aylien-results__emotions__content__row__title">Tone</p>
          <p id="polarity"></p>
          <progress max="100" value="" id="polarity_confidence"></progress>
      </div>
      <div class="aylien-results__emotions__content__row">
          <p class="aylien-results__emotions__content__row__title">Perspective</p>
          <p id="subjectivity"></p>
          <progress
              max="100"
              value=""
              id="subjectivity_confidence"
          ></progress>
      </div>
      `;
};

/**
 * Appends on footer the actual year :D
 */
export const showCopyRightYear = () => {
  document.getElementById(
    "copyright-year"
  ).innerText = `©${new Date().getFullYear()}`;
};
