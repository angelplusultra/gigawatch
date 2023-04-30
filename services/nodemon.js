import { spawn } from "child_process";
export function nodemonInit({ compiler, file, cleanMode }) {
  let statement = cleanMode
    ? ["--exec", "clear; ", compiler, file]
    : ["--exec", compiler, file];

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
}
