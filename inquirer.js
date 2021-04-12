const inquirer = require("inquirer");
require("colors");
const { readFiles, totalStats, validateLinks } = require("./ejemplo");

const questions = [
  {
    type: "confirm",
    name: "validate",
    alias: "-v",
    message: "validate",
    validate: (answer) => {
      if (answer === "") {
        return "please enter an option";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "stats",
    alias: "-s",
    message: "Deseas conocer las estadisticas?",
    validate: (answer) => {
      if (answer === "") {
        return "Selleciona una opcion";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "validateStats",
    message: "validate stats",
    validate: (answer) => {
      if (answer === "") {
        return "escribe algo";
      }
      return true;
    },
  },
];

console.log("============================".green);
console.log("   Selecciona una opcion    ".green);
console.log("============================\n".green);

inquirer
  .prompt(questions)
  .then((answers) => {
    // Use user feedback for... whatever!!

    switch (answers) {
      case "validate":
        console.log(colors.cyan.bold("Validation of the links:"));
        validateLinks();
        break;
      case "stats":
        console.log(colors.cyan.bold("Stats of the links:"));
        totalStats();
        break;
      case "validateStats":
        console.log(colors.cyan.bold("Validation and stats of the links:"));
        readFiles();
        return;
      default:
        console.log("Execute de --help command for more information");
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

// const questions = [
//   {
//     type: "input",
//     name: "name",
//     message: "Whats your name?",
//     validate: (answer) => {
//       if (answer === "") {
//         return "please enter a valid name";
//       }
//       return true;
//     },
//   },
//   {
//     type: "input",
//     name: "heigth",
//     message: "What is you height (in inches)?",
//     validate: (answer) => {
//       if (isNaN(answer)) {
//         return "please enter a valid number";
//       }
//       return true;
//     },
//   },
//   {
//     type: "input",
//     name: "weight",
//     message: "What is your current weight (in lbs)?",
//     validate: (answer) => {
//       if (isNaN(answer)) {
//         return "please enter a valid number";
//       }
//       return true;
//     },
//   },
//   {
//     type: "input",
//     name: "lenguaget",
//     message: "favorite programming lenguaje?",
//     default: "javascript",
//     choices: ["javascript", "java", "c++", "python"],
//   },
//   {
//     type: "checkbox",
//     name: "checkbox question",
//     message: "How many  programming lenguaje do u speak?",
//     default: "javascript",
//     choices: ["javascript", "java", "c++", "python"],
//   },
// ];

// console.log("============================".green);
// console.log("   Selecciona una opcion    ".green);
// console.log("============================\n".green);

// inquirer
//   .prompt(questions)
//   .then((answers) => {
//     // Use user feedback for... whatever!!
//     const height = answers.height;
//     const weight = answers.weight;
//     const bmi = (weight / (height * height)) * 703;
//     if (bmi < 16) {
//       console.log(`${answers.name} your BMI is ${bmi}`);
//     }
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });
