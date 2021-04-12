let colors = require("colors");
const { readFiles, totalStats, validateLinks } = require("./ejemplo");

const options = {
  path: {
    demandOption: true,
    alias: "p",
    default: "README.md",
  },
};

const argv = require("yargs")
  .command("validate", "validatee", options)
  .command("stats", "statss", options)
  .command("validateStats", "validateStatss", options)
  .help().argv;

const command = argv._[0];

switch (command) {
  case "validate":
    console.log(colors.cyan.bold("Validation of the links:"));
    validateLinks(argv.path);
    break;
  case "stats":
    console.log(colors.cyan.bold("Stats of the links:"));
    totalStats(argv.path);
    break;
  case "validateStats":
    console.log(colors.cyan.bold("Validation and stats of the links:"));
    readFiles(argv.path);
    return;
  default:
    console.log("Execute de --help command for more information");
}
//------------------------------------------
// const argv = require("yargs")
//   .option("v", {
//     alias: " validate",
//     type: " number",
//     demandOption: true,
//     default: false,
//   })
//   .option("s", {
//     alias: " stats",
//     type: "boolean",
//     demandOption: true,
//     default: false,
//   })
//   .check((argv, options) => {
//     if (isNaN(argv.v)) {
//       throw "la base tiene que ser un numero";
//     }
//     return true;
//   }).argv;

// mdLinks(argv.v, argv.s)
//   .then((nombreArchivo) => {
//     console.log(nombreArchivo, "creado");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// console.log("base: yargs", argv.b);
