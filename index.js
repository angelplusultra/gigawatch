#!/usr/bin/env node

// const args = process.argv.slice(2); // slice off the first two arguments, which are the node binary and the script file name
// const name = args[1] || "World"; // default to 'World' if no name is provided
// const compiler = args[0];
// console.log(`Hello, ${name}!`);
//
import { exec, spawn } from "child_process";

import inquirer from "inquirer";
import colors from "colors";
import { controllers } from "./controllers/controllers.js";
import { validateFileExistence } from "./middleware/validators.js";
import fs from "fs";
import figlet from "figlet";
import path from "path";
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
// returns true/false; doesn't throw

async function main() {
  let data = fs.readFileSync(path.join(__dirname, '/fonts/slant.flf'), "utf8");
  figlet.parseFont("myfont", data);
  console.log(figlet.textSync("GigaWatch", "myfont").cyan);

  inquirer
    .prompt([
      {
        type: "list",
        name: "compiler",
        message: "Choose your compiler/runtime",
        choices: ["JavaScript", "TypeScript", "Python", "Lua"],
      },
      {
        type: "input",
        name: "file",
        message: "Specify the path to the file",
      },
      {
        type: "confirm",
        name: "cleanMode",
        message: "Clean Mode?",
      },
    ])
    .then((answers) => {
      console.log(answers);
      if (!answers.file) {
        return console.log("You need to specify the file path");
      }

      if (answers.compiler == "TypeScript") {
        return controllers.typescript(answers);
      }
      if (answers.compiler == "Python") {
        return controllers.python(answers);
      }

      if (answers.compiler == "Lua") {
        validateFileExistence(answers.file, ".lua");
        return controllers.lua(answers);
      }
    });
}

main();
