const fs = require("fs");
const colors = require("colors");
const chalk = require("chalk");
const path = require("path");
const fetch = require("node-fetch");
// const peticion = require("./fetch");

//----------------------------------------------------

//------------------------------------------------------

function readFiles(files, absolutePath) {
  let links = [];
  files.forEach((archivo) => {
    const join = path.join(absolutePath, archivo);
    const extension = path.extname(join);
    if (extension === ".md") {
      let data = fs.readFileSync(join, "utf8");
      const newLinks = fileLinks(data);
      links = links.concat(newLinks);
      console.log(newLinks); // --> obtener links acá
    }
  });
  return links;
}

//  F.02 OBTENER LINKS
const fileLinks = (data) => {
  let linksCollection = [];
  let regularExpression = /https?:\/\/[a-zA-Z\.\/-]+/gm;
  linksCollection = data.replace(/[{()}]/g, "").match(regularExpression);
  return linksCollection || []; // --> la forma más ideomática de escribir esta idea
};

const validateLinks = (links) => {
  let allLinks = links.map((link) => {
    fetch(link)
      .then((response) => {
        let validate = {
          href: link,
          text: "text",
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
          path: "path",
          status: response.status,
          statusText: response.statusText,
        };
        return validate;
      });
  });
  // return Promise.all(allLinks).then((newresponse) => {
  //   return newresponse;
  // });
};

//F.04 Estadisticas de TOTAL y UNIQUES -> totalStats()
const totalStats = (linksCollection) => {
  //let allLinks = linksCollection.map(link => link.href);
  //console.log(allLinks, 'OOOO')
  const totalLinks = linksCollection.length;
  //console.log(totalLinks)
  const uniqueLinks = [...new Set(linksCollection)].length;
  //console.log(uniqueLinks)
  //const brokenLinks = linksValidatacion(linksCollection);
  //.filter(response => response.status == '404')
  //console.log(brokenLinks.then(response => { return response }));
  // const brokenLikns
  //brokenLinks += (statusLinks.toString().match(/FAIL/g));
  let statsResult = {
    total: totalLinks,
    unique: uniqueLinks,
    //broken: brokenLinks,
  };
  console.log(statsResult);
};

function main() {
  //  RUTA ABSOLUTA DE CARPETA
  const ruteAbsolute = path.resolve("./Markdown");
  //console.log(ruteAbsolute)

  const files = fs.readdirSync("./Markdown");
  //console.log(files);

  const links = readFiles(files, ruteAbsolute);
  //console.log(links);

  validateLinks(links);

  totalStats(links);

  //const promises = links.map((link) => validateLink(link));

  //linksStatus(promises);

  //statsLink(promises);
}
// main();

// module.exports = {
//   readFiles,
//   totalStats,
//   validateLinks,
// };
