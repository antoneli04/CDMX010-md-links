const fetch = require("node-fetch");

const peticion = (links) => {
  links.map((link) => {
    fetch(link)
      .then((response) => {
        let validate = {
          href: link,
          text: "text",
          file: "file",
          path: "path",
          status: response.status,
          statusText: response.statusText,
        };
        console.log(validate);
      })
      .catch((err) => {
        validate = {
          href: err.link,
          text: "text",
          file: "file",
          path: "path",
          status: response.status,
          statusText: response.statusText,
        };
        return validate;
      });
  });
};

module.exports = {
  peticion,
};

// const files = fs.statSync(file)

// primera expresión regular:
// /\[([^[]+)\](\(.*\))/gm;
// Segunda expresion regular
// /\[([^[]+)\]\((.*)\)/;
