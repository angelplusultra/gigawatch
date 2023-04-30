#!/usr/bin/env node


import { exec, spawn } from "child_process";

import inquirer from "inquirer";
import colors from "colors";
import { controllers } from "./controllers/controllers.js";
import { validateFileExistence } from "./middleware/validators.js";
import fs from "fs";
import figlet from "figlet";
import path from "path";
import * as url from "url";
import { parseArgs } from "./services/parseArgs.js";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
// returns true/false; doesn't throw

async function main() {
   const {argsProvided, compiler, cleanMode, filePath: file} = parseArgs()



  /* ROUTING FOR ARGUMENTS PROIVDED*/
  if(argsProvided){
    if(!compiler || !file){
      return console.error("Error: When using flags you must at least provide arguments for -f (file) and a compiler option (-t, -j, -p, -l), See documentation for more: https://github.com/angelplusultra/GigaWatch")
    }
    if(compiler == 'TypeScript'){
      validateFileExistence(file, '.ts')
      return controllers.typescript({file, cleanMode})
    }
    if(compiler == 'JavaScript'){
      validateFileExistence(file, '.js')
      return controllers.javascript({file, cleanMode})
    }
    if(compiler == 'Python'){
      validateFileExistence(file, '.py')
      return controllers.python({file, cleanMode})
    }
    if(compiler == 'Lua'){
      validateFileExistence(file, '.lua')
      return controllers.lua({file, cleanMode})
    }

  } 






/*CLI ROUTING*/
  let data = fs.readFileSync(path.join(__dirname, "/fonts/slant.flf"), "utf8");
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
        validateFileExistence(answers.file, ".ts");
        return controllers.typescript(answers);
      }
      if (answers.compiler == "Python") {
        validateFileExistence(answers.file, ".py");
        return controllers.python(answers);
      }
      if (answers.compiler == "JavaScript") {
        validateFileExistence(answers.file, ".js");
        return controllers.javascript(answers);
      }
      if (answers.compiler == "Lua") {
        validateFileExistence(answers.file, ".lua");
        return controllers.lua(answers);
      }
    });
}

main();
