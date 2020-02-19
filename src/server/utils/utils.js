/**
 * Checks if a string is a URL or not
 * @param {string} url - The URL to check
 * @return {boolean} - True if the string is an URL, false otherwise
 * Thanks to : https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
 */
const isURL = url => {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

  const regex = new RegExp(expression);
  return url.match(regex);
};

module.exports = {
  isURL
};
