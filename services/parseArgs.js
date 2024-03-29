const args = process.argv.slice(2); // slice off the first two arguments, which are the node binary and the script file name
export function parseArgs() {
  let compiler, filePath, cleanMode, argsProvided;

  cleanMode = false;
  if (args.length < 2) {
    argsProvided = false;
  } else {
    argsProvided = true;
  }

  args.forEach((arg, i) => {
    if (arg === "-c") {
      cleanMode = true;
    }
    if (arg === "-j") {
      compiler = "JavaScript";
    }

    if (arg === "-t") {
      compiler = "TypeScript";
    }
    if (arg === "-p") {
      compiler = "Python";
    }
    if (arg === "-l") {
      compiler = "Lua";
    }
    if (arg == "-f") {
      filePath = args[i + 1];
    }
  });

  return { argsProvided, cleanMode, compiler, filePath };
}
