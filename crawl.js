// Normalize URLs test function

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
};
