// const funcs = require("./index");
const { convertToAbsolute, validateOptions, extraerLinks } = require("./index");

const mdlinks = (path, options) =>
  new Promise((resolve) => {
    const absRoute = convertToAbsolute(path);
    if (options.validate === true) {
      resolve(validateOptions(absRoute));
    } else {
      resolve(extraerLinks(absRoute));
    }
  });

// mdlinks("./Markdown/cifrado.md", { validate: false }).then((response) => {
//   console.log(response);
// });

module.exports = { mdlinks };
