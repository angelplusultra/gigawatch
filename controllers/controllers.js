import inquirer from "inquirer";

import { exec, spawn } from "child_process";
import ora from "ora";
import { sync as commandExistsSync } from "command-exists";
import { nodemonInit } from "../services/nodemon.js";
import { run } from "../services/run.js";

export const controllers = {
  async lua({ file, cleanMode }) {
    if (commandExistsSync("luaaa")) {
      console.log("Command exists");
      nodemonInit({
        file,
        cleanMode,
        compiler: "lua",
      });
    } else {
      inquirer
        .prompt([
          {
            type: "confirm",
            name: "downloadLua",
            message:
              "It looks like you dont have the Lua compiler on your system, would you like us to install it for you?",
          },
        ])
        .then(async (answer) => {
          if (answer.downloadLua == true) {
            console.log("Command doesnt exist");
            await run("sudo apt install lua5.3");

            console.log("Installed");
            if (commandExistsSync("lua")) {
              nodemonInit({
                compiler: "lua",
                file,
                cleanMode,
              });
            }
          }
        });
    }
  },
  typescript({ file, cleanMode }) {
    if (commandExistsSync("ts-node")) {
      nodemonInit({
        file,
        cleanMode,
        compiler: "ts-node",
      });
    } else {
      inquirer
        .prompt([
          {
            type: "confirm",
            name: "downloadPrompt",
            message:
              "It looks like you dont have the ts-node package, would you like us to install it for you?",
          },
        ])
        .then(async (answers) => {
          if (answers.downloadPrompt == true) {
            const spinner = ora("Downloading ts-node").start();
            const downloaded = await run("npm install -g ts-node");

            spinner.stop();
            console.log("Downloaded!");
            if (commandExistsSync("ts-node")) {
              nodemonInit({
                compiler: "ts-node",
                file,
                cleanMode,
              });
            }
          }
        });
    }
  },
};
