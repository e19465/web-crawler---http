const printReport = (pages) => {
  console.log("\n======================");
  console.log("======= REPORT =======");
  console.log("======================");
  const sortedPages = sortPages(pages);
  for (const sortPage of sortedPages) {
    const url = sortPage[0];
    const hits = sortPage[1];
    console.log(`Found ${hits} links to page ${url}`);
  }
  console.log("======================");
  console.log("===  END OF REPORT ===");
  console.log("======================");
};

const sortPages = (pages) => {
  const pagesArray = Object.entries(pages);
  pagesArray.sort((a, b) => {
    aHits = a[1];
    bHits = b[1];
    return bHits - aHits;
  });
  return pagesArray;
};

module.exports = {
  sortPages,
  printReport,
};
