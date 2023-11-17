const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");
///////////////////////////////////////////

async function main() {
  if (process.argv.length < 3) {
    console.log("No website provided!");
    process.exit(1);
  } else if (process.argv.length > 3) {
    console.log("Too many command line arguments!");
    process.exit(1);
  }

  const baseURL = process.argv[2]; // base url that we crawling

  console.log(`Starting crawl of ${baseURL}\n`);
  const pages = await crawlPage(baseURL, baseURL, {});

  printReport(pages);
}

main();
