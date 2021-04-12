// Desde este archivo debes exportar una función (mdLinks).

const fs = require("fs");
const colors = require("colors");
const chalk = require("chalk");
const path = require("path");
const fetch = require("node-fetch");
// const peticion = require("./fetch");

//----------------------------------------------------
//Verifica si existe la ruta
const existRoute = (route) => fs.existsSync(route);
console.log(
  existRoute("/Users/Antoneli/Documents/Developer/CDMX010-md-links/ejemplo.js")
);

//Verifica si es la ruta es absoluta
const routeAbsolute = (route) => path.isAbsolute(route);
console.log(routeAbsolute("README.md"));

//verifica si es archivo
const routeIsFile = (route) => fs.statSync(route).isFile();
console.log(
  routeIsFile(
    "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links/ejemplo.js"
  )
);

// verifica su extension
const routeIsMd = (route) => path.extname(route);
console.log(routeIsMd("./Markdown/read.md"));

//Lee directorio
const readDirectory = (route) => fs.readdirSync(route);
console.log(readDirectory("./Markdown"));

//relativa a absoluta
const convertToAbsolute = (route) => {
  if (!routeAbsolute(route)) {
    return path.resolve(route);
  }
  return route;
};
console.log(convertToAbsolute("read.md"));

//leer directorio y especificar ruta
const filesAndDirectories = (route) =>
  readDirectory(route).map((element) => path.join(route, element));
console.log(
  filesAndDirectories("C:/Users/Antoneli/Documents/Developer/CDMX010-md-links")
);

//extraer archivos md
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
console.log(
  searchRouteMd(
    "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links/Markdown"
  )
);

// leer el archivo md
// const readFilePath = (route) => fs.readFileSync(route).toString();
// console.log(
//   readFilePath(
//     "C:/Users/Antoneli/Documents/Developer/CDMX010-md-links/Markdown/cifrado.md"
//   )
// );

function readFilePath(route) {
  const readFile = fs.readFileSync(route).toString();
  return readFile;
}

//----------------------------------------------------

// function readFile(ruta) {
//   const readFile = fs.readFileSync(ruta, "utf-8");
//   return readFile;
// }

function readDir(ruta) {
  const absoluteRoute = path.resolve("./MarkDown");
  console.log(chalk.yellow(absoluteRoute));
  fs.readdir(ruta, (err, files) => {
    if (err) {
      console.error(chalk.red(err.message));
    } else {
      files.map((element) => {
        const route = path.join(absoluteRoute, element);
        console.log(route.blue);
        const extension = path.extname(element);
        if (extension === ".md") {
          let data = readFilePath(route);
          // console.log(data.yellow);
          let regEx = /https?:\/\/[a-zA-Z\.\/-]+/gm;
          let links = data.match(regEx);
          console.log(links);
          return validateLinks(links);
        }
      });
    }
  });
}

readDir(__dirname + "/MarkDown");
// readDir(__dirname + "/MarkDown/Archivos-prueba");

//-----------------------------------------------
const validateLinks = (links) => {
  let alllinks = links.map((link) => {
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
  return Promise.all(alllinks).then((newresponse) => {
    return newresponse;
  });
};

//--------------------------------------------------

//-------------------------------

// function readFile(ruta) {
//   const readFile = fs.readFileSync(ruta, "utf-8");
//   return readFile;
// }

// function readDir(ruta) {
//   console.log("run");
//   const absoluteRoute = path.resolve("./MarkDown");
//   console.log(chalk.yellow(absoluteRoute));
//   fs.readdir(ruta, (err, files) => {
//     if (err) {
//       console.error(chalk.red(err.message));
//     } else {
//       files.map((element) => {
//         const route = path.join(absoluteRoute, element);
//         console.log(route.blue);
//         const extension = path.extname(element);
//         if (extension === ".md") {
//           let data = readFile(route);
//           // console.log(data.yellow);
//           let regEx = /https?:\/\/[a-zA-Z\.\/-]+/gm;
//           let links = data.match(regEx);
//           console.log(links);
//           return validateLinks(links);
//         }
//       });
//     }
//   });
// }

// readDir(__dirname + "/MarkDown");
// // readDir(__dirname + "/MarkDown/Archivos-prueba");

// //-----------------------------------------------
// const validateLinks = (links) => {
//   let alllinks = links.map((link) => {
//     fetch(link)
//       .then((response) => {
//         let validate = {
//           href: link,
//           text: "text",
//           path: "path",
//           status: response.status,
//           statusText: response.statusText,
//         };
//         console.log(validate);
//       })
//       .catch((err) => {
//         validate = {
//           href: err.link,
//           text: "text",
//           path: "path",
//           status: response.status,
//           statusText: response.statusText,
//         };
//         return validate;
//       });
//   });
//   return Promise.all(alllinks).then((newresponse) => {
//     return newresponse;
//   });
// };

// //--------------------------------------------------
// // console.clear();

// // const main = async () => {
// //   console.log("Hola mundo");
// //   let opt = "";

// //   do {
// //     opt = await inquirerMenu();
// //     console.log({ opt });

// //     await pausa();
// //   } while (opt !== "0");

// //   pausa();
// // };

// // main();

// //-------------------------------
