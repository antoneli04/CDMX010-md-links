const totalLinks = (array) => array.length;
// console.log(totalLinks("Markdown/cifrado"));

const uniqueLinks = (array) => [...new Set(array)].length;
// console.log(uniqueLinks("Markdown/cifrado"));

const brokenLinks = (array) =>
  array.filter((obj) => obj.statusText === "FAIL").length;

module.exports = {
  totalLinks,
  uniqueLinks,
  brokenLinks,
};
