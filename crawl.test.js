const { normalizeUrl, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeUrl strip protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";

  expect(actual).toEqual(expected);
});

test("normalizeUrl strip trailing slash", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";

  expect(actual).toEqual(expected);
});

test("normalizeUrl capitals", () => {
  const input = "https://BLOG.boot.dev/path";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";

  expect(actual).toEqual(expected);
});

test("normalizeUrl strip http", () => {
  const input = "http://blog.boot.dev/path";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";

  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute URLs", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">Boot.dev blog</a>
        </body>
    </html>
  `;
  const inputBaseUrl = "https://blog.boot.dev/path/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/path/"];

  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative URLs", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">Boot.dev blog</a>
        </body>
    </html>
  `;
  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/path/"];

  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both relative and absolute URLs", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">Boot.dev blog path 1</a>
            <a href="/path2/">Boot.dev blog path 2</a>
        </body>
    </html>
  `;
  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
  ];

  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid URLs", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">Invalid URL</a>
        </body>
    </html>
  `;
  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = [];

  expect(actual).toEqual(expected);
});
