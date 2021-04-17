const colors = require("colors");
const chalk = require("chalk");
const { mdlinks } = require("./mdlinks.js");
const { totalLinks, uniqueLinks, brokenLinks } = require("./options.js");

const cli = (path, options) => {
  if (options.stats === "--stats" && options.validate === "--validate") {
    return mdlinks(path, { validate: true }).then((data) => {
      console.log(data);
      let sValidate = "";
      sValidate += ` 
      Total: ${totalLinks(data)}\n
      Uniques: ${uniqueLinks(data)}\n
      Broken: ${brokenLinks(data)}`;
      return sValidate;
    });
  }
  if (options.validate == "--validate" && options.stats === "--stats") {
    return mdlinks(path, { validate: true }).then((data) => {
      console.log(data);
      let sValidate = "";
      sValidate += `
      Total: ${totalLinks(data)}\n
      Uniques: ${uniqueLinks(data)}\n
      Broken: ${brokenLinks(data)}`;
      return sValidate;
    });
  }
  if (options.stats === "--stats") {
    return mdlinks(path, { validate: false }).then((data) => {
      console.log(data);
      let stat = "";
      stat += ` 
      Total: ${totalLinks(data)}\n
      Uniques: ${uniqueLinks(data)}`;
      return stat;
    });
  }
  if (options.validate === "--validate") {
    return mdlinks(path, { validate: false }).then((data) => {
      console.log(data);
      let valid = "";
      valid += `Broken: ${brokenLinks(data)}
      Status: {}`;
    });
  }
};

// cli("./Markdown/cifrado.md", { validate: "true" }).then((response) => {
//   console.log(response);
// });

module.exports = {
  cli,
};
