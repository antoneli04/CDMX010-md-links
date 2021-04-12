const { resolve } = require("path");

require("colors");

const mostarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("============================".green);
    console.log("   Selecciona una opcion    ".green);
    console.log("============================\n".green);

    console.log(`${"1.".green} Crear tarea`);
    console.log(`${"2.".green} Listar tareas`);
    console.log(`${"3.".green} Listar tareas completadas`);
    console.log(`${"4.".green} Listar tareas pendentes`);
    console.log(`${"5.".green} Completar tarea(s)`);
    console.log(`${"6.".green} Borrar tarea`);
    console.log(`${"0.".green} Salir \n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Seleccione un aopcion:", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPresione ${"ENTER".green} para continuar\n`, (opt) => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  mostarMenu,
  pausa,
};

//-------------------------------------
// function readFile(ruta, callback) {
//   fs.readFile(ruta, (err, data) => {
//     if (err) {
//       console.error(chalk.red(err.message));
//     } else {
//       callback(colors.magenta(data.toString()));
//     }
//   });
// }

// function readDir(ruta) {
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
//           readFile(route, console.log);
//         }
//       });
//     }
//   });
// }

// // const getLinks = (data) => {
// //   let regEx = /https?:\/\/[a-zA-Z\.\/-]+/gm;
// //   let links = data.match(regEx);
// //   return links;
// // };

// readDir(__dirname + "/MarkDown");
