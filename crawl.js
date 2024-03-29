// Normalize URLs test function

const { JSDOM } = require("jsdom");

const crawlPage = async (baseURL, currentURL, pages) => {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeUrl(currentURL);

  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;
  console.log(`Actively crawling: ${currentURL}`);

  try {
    const response = await fetch(currentURL);
    if (response.status > 399) {
      console.log(
        `Error in fetch with status code: ${response.status}, on page: ${currentURL}`
      );
      return pages;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `Non HTML response, content-type: ${contentType}, on page: ${currentURL}`
      );
      return pages;
    }

    const htmlBody = await response.text();
    const nextURLs = getURLsFromHTML(htmlBody, baseURL);

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (err) {
    console.log(`Error in fetch: ${err.message}, on page: ${currentURL}`);
  }

  return pages;
};

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
  crawlPage,
};
