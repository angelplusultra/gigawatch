#!/usr/bin/env node

// const args = process.argv.slice(2); // slice off the first two arguments, which are the node binary and the script file name
// const name = args[1] || "World"; // default to 'World' if no name is provided
// const compiler = args[0];
// console.log(`Hello, ${name}!`);
//
import { exec, spawn } from "child_process";

import inquirer from "inquirer";
import art from "ascii-art";
import colors from "colors";
import { controllers } from "./controllers/controllers.js";
import { compilers } from "./constants/constants.js";
import { sync as commandExistsSync } from "command-exists";
import { validateFileExistence } from "./middleware/validators.js";
// returns true/false; doesn't throw

console.log(commandExistsSync("ts-node"));
async function main() {
  const welcome = await art.font("GigaWatch", "slant").completed();

  console.log(welcome.cyan);

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
        validateFileExistence(answers.file, '.lua')
        return controllers.lua(answers);
      }

    });
}

main();
