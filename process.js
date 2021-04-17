#!/usr/bin/env node

const { cli } = require("./cli");

const path = process.argv[2];
const options = {
  stats: process.argv[3],
  validate: process.argv[4],
};

cli(path, options)
  .then((res) => console.log(res))
  .catch(() => console.log("Ingrese una ruta valida"));
