const colors = require("colors");
const chalk = require("chalk");
const { mdlinks } = require("./mdlinks");
const { totalLinks, uniqueLinks, brokenLinks } = require("./options");

const help = chalk.cyan.inverse(`
* * * * * * * * * * * *   Help  * * * * * * * * * * * * *
*                                                       *
*      md-links <path-to-file> --validate               *
*      md-links <path-to-file> --stats                  *
*      md-links <path-to-file> --stats --validate       *
*      md-links <path-to-file> --validate --stats       *
*                                                       *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
`);

const cli = (path, options) => {
  if (options.stats === "--stats" && options.validate === "--validate") {
    return mdlinks(path, { validate: true }).then((data) => {
      console.log(data);
      let sValidate = "";
      sValidate += colors.bold.green.bgBlack.inverse(`
      ✨ Total: ${colors.bold.bgMagenta(totalLinks(data))}     \n
      ✔ Uniques: ${colors.bold.bgMagenta(uniqueLinks(data))}   \n
      ✖ Broken: ${colors.bold.bgRed(brokenLinks(data))}     \n`);
      return sValidate;
    });
  }
  if (options.stats == "--validate" && options.validate === "--stats") {
    return mdlinks(path, { validate: true }).then((data) => {
      console.log(data);
      let sValidate = "";
      sValidate += colors.bold.green.bgBlack.inverse(`
      ✨ Total: ${colors.bold.bgMagenta(totalLinks(data))}      \n
      ✔ Uniques: ${colors.bold.bgMagenta(uniqueLinks(data))}    \n
      ✖ Broken: ${colors.bold.bgRed(brokenLinks(data))}      \n`);
      return sValidate;
    });
  }
  if (options.stats === "--stats") {
    return mdlinks(path, { validate: false }).then((data) => {
      console.log(data);
      let stat = "";
      stat += colors.green.bgBlack.inverse(`
      ✔ Total: ${colors.bgMagenta(totalLinks(data))}      \n
      ✔ Uniques: ${colors.bgMagenta(uniqueLinks(data))}    \n`);
      return stat;
    });
  }
  if (options.stats === "--validate") {
    return mdlinks(path, { validate: true }).then((data) => {
      let validate = "";
      data.forEach((element) => {
        validate += chalk.magenta.bgBlack(`
       Link: ${colors.cyan(element.href)} 
       Status: ${
         element.statusText === "OK"
           ? colors.italic.green(element.statusText)
           : colors.italic.red(element.statusText)
       }  ${
          element.status == "200"
            ? colors.green(element.status)
            : colors.red(element.status)
        }
        `);
      });
      return validate;
    });
  }
  return mdlinks(path, { validate: false }).then(() => {
    console.log(help);
  });
};

// cli("./Markdown/cifrado.md", { validate: "true" }).then((response) => {
//   console.log(response);
// });

module.exports = {
  cli,
};
