#!/usr/bin/env node

// const args = process.argv.slice(2); // slice off the first two arguments, which are the node binary and the script file name
// const name = args[1] || "World"; // default to 'World' if no name is provided
// const compiler = args[0];
// console.log(`Hello, ${name}!`);
//
const { exec, spawn } = require("child_process");

const inquirer = require("inquirer");
const art = require("ascii-art");
const colors = require("colors");

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
        console.log("No file");
      }

      const compilers = {
        TypeScript: "ts-node",
        Python: "python3",
        Lua: "lua",
      };
let statement
      if (answers.compiler === "JavaScript") {
        console.log(answers);
        statement = answers.cleanMode ? ["--exec", "clear; node", answers.file] : [answers.file]
      } else {
      statement = answers.cleanMode
          ? ["--exec", "clear; ", compilers[answers.compiler], answers.file]
          : ["--exec", compilers[answers.compiler], answers.file];
      }
        const nodemon = spawn("nodemon", statement);

        nodemon.stdout.on("data", (data) => {
          console.log(data.toString());
        });

        nodemon.stderr.on("data", (data) => {
          console.error(`stderr: ${data}`);
        });

        nodemon.on("close", (code) => {
          console.log(`nodemon process exited with code ${code}`);
        });
      
    });
}

main();
