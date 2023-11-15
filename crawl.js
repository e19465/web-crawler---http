// Normalize URLs test function

const { JSDOM } = require("jsdom");

const getURLsFromHTML = (htmlBody, baseUrl) => {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElementsArray = dom.window.document.querySelectorAll("a");

  for (linkElement of linkElementsArray) {
    if (linkElement.href.slice(0, 1) === "/") {
      // relative URL

      try {
        const urlObject = new URL(`${baseUrl}${linkElement.href}`);
        urls.push(urlObject.href);
      } catch (err) {
        console.log(`Error with relative URL: ${err.message}`);
      }
    } else {
      // absolute URL
      try {
        const urlObject = new URL(linkElement.href);
        urls.push(urlObject.href);
      } catch (err) {
        console.log(`Error with absolute URL: ${err.message}`);
      }
    }
  }

  return urls;
};

const normalizeUrl = (urlString) => {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if ((hostPath.length > 0 && hostPath.slice(-1)) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
};

module.exports = {
  normalizeUrl,
  getURLsFromHTML,
};
