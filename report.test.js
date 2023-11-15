const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test("sortPages 2 pages", () => {
  const input = {
    "http://wagslane.dev/path": 1,
    "http://wagslane.dev": 3,
  };
  const actual = sortPages(input);
  const expected = [
    ["http://wagslane.dev", 3],
    ["http://wagslane.dev/path", 1],
  ];

  expect(actual).toEqual(expected);
});

test("sortPages 5 pages", () => {
  const input = {
    "http://wagslane.dev/path": 1,
    "http://wagslane.dev": 3,
    "http://wagslane.dev/path2": 5,
    "http://wagslane.dev/path3": 2,
    "http://wagslane.dev/path4": 9,
  };
  const actual = sortPages(input);
  const expected = [
    ["http://wagslane.dev/path4", 9],
    ["http://wagslane.dev/path2", 5],
    ["http://wagslane.dev", 3],
    ["http://wagslane.dev/path3", 2],
    ["http://wagslane.dev/path", 1],
  ];

  expect(actual).toEqual(expected);
});
