// Desde este archivo debes exportar una función (mdLinks).

const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const marked = require("marked");

//----------------------------------------------------
// Verifica si existe la ruta
const existRoute = (route) => fs.existsSync(route);
// console.log(
//   existRoute("/Users/Antoneli/Documents/Developer/CDMX010-md-links/ejemplo.js")
// );

//Verifica si es la ruta es absoluta
const routeAbsolute = (route) => path.isAbsolute(route);
// console.log(routeAbsolute("README.md"));

//verifica si es archivo
const routeIsFile = (route) => fs.statSync(route).isFile();
// console.log(
//   routeIsFile(
//     "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links/ejemplo.js"
//   )
// );

// verifica su extension
const routeIsMd = (route) => path.extname(route);
// console.log(routeIsMd("./Markdown/read.md"));

//Lee directorio
const readDirectory = (route) => fs.readdirSync(route);
// console.log(readDirectory("./Markdown"));

//relativa a absoluta
const convertToAbsolute = (route) => {
  if (!routeAbsolute(route)) {
    return path.resolve(route);
  }
  return route;
};
// console.log(convertToAbsolute("read.md"));

//leer directorio y especificar ruta
const filesAndDirectories = (route) =>
  readDirectory(route).map((element) => path.join(route, element));
// console.log(
//   filesAndDirectories(
//     "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links/Markdown"
//   )
// );

//extraer archivos md con recursividad
const searchRouteMd = (route) => {
  let mdFiles = [];
  const filePath = convertToAbsolute(route);
  if (routeIsFile(filePath)) {
    if (routeIsMd(filePath) === ".md") {
      mdFiles.push(filePath);
    }
  } else {
    filesAndDirectories(route).forEach((element) => {
      const filesNewRoute = element;
      const getMdFilesInNewRoute = searchRouteMd(filesNewRoute);
      mdFiles = mdFiles.concat(getMdFilesInNewRoute);
    });
  }
  return mdFiles;
};
// console.log(
//   searchRouteMd(
//     "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links/Markdown"
//   )
// );

// leer el archivo md texto
const readFilePath = (route) => fs.readFileSync(route).toString();
// console.log(
//   readFilePath(
//     "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links/Markdown/cifrado.md"
//   )
// );

// extraer links, path, text
const extraerLinks = (route) => {
  const arrayLinks = [];
  const renderer = new marked.Renderer();
  searchRouteMd(route).forEach((file) => {
    renderer.link = function (href, title, text) {
      const linksObject = {
        href,
        text,
        file,
      };
      arrayLinks.push(linksObject);
    };
    marked(readFilePath(file), { renderer });
  });
  const arrayLinkFilter = arrayLinks.filter((element) =>
    /https?:\/\/[a-zA-Z\.\/-]+/gm.test(element.href)
  );
  return arrayLinkFilter;
};
// console.log(
//   extraerLinks(
//     "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links/Markdown"
//   )
// );

const validateOptions = (route) => {
  const arrayValidate = [];
  const linksArray = extraerLinks(route);
  linksArray.forEach((el) => {
    const obj = { ...el };
    arrayValidate.push(
      fetch(el.href)
        .then((res) => {
          if (res.status === 200) {
            obj.status = res.status;
            obj.statusText = "OK";
            return obj;
          }
          if (res.status !== 200) {
            obj.status = res.status;
            obj.statusText = "FAIL";
            return obj;
          }
        })
        .catch(() => {
          obj.status = "no status";
          obj.statusText = "FAIL";
          return obj;
        })
    );
  });
  return Promise.all(arrayValidate);
};

module.exports = {
  existRoute,
  routeAbsolute,
  routeIsFile,
  routeIsMd,
  readDirectory,
  convertToAbsolute,
  filesAndDirectories,
  searchRouteMd,
  readFilePath,
  extraerLinks,
  validateOptions,
};
