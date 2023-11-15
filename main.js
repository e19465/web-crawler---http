const { crawlPage } = require("./crawl.js");

async function main() {
  if (process.argv.length < 3) {
    console.log("No website provided!");
    process.exit(1);
  } else if (process.argv.length > 3) {
    console.log("Too many command line arguments!");
    process.exit(1);
  }

  const baseURL = process.argv[2]; // base url that we crawling

  // why ckeck for length of 3
  //for (const arg of process.argv) {
  // if we passed 1 command line argument ===> process.argv has length of 3
  // input ===> npm start wagslane.dev
  // outputs:
  // C:\Program Files\nodejs\node.exe ==> argument 1 : interpreter
  // C:\Users\Sasindu\Desktop\HTTP project to github\web-crawler---http\main.js ===> argument 2 : name of our code
  // wagslane.dev ===> argument 3 : actual paramater we passed in command line

  //console.log(arg);
  //}

  console.log(`Starting crawl of ${baseURL}\n`);
  const pages = await crawlPage(baseURL, baseURL, {});

  for (const page of Object.entries(pages)) {
    console.log(page);
  }
}

main();
