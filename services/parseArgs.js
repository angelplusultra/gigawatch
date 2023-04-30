const args = process.argv.slice(2); // slice off the first two arguments, which are the node binary and the script file name
const name = args[1] || "World"; // default to 'World' if no name is provided
const compiler = args[0];
export function parseArgs() {
  let compiler, filePath, cleanMode, argsProvided

  cleanMode = false
  if(args.length === 0){
    argsProvided = false
  } else{
    argsProvided = true
  }
console.log(args)
  let flags = {
    '-c': 'Clean Mode',
    '-t': 'TypeScript',
    '-p': 'Python',
    '-j': 'JavaScript',
    '-l': 'Lua'
  }

  args.forEach((arg, i) => {
    if(arg === '-c'){
      cleanMode = true
    }
    if(arg === '-j'){
      compiler = 'JavaScript'
    }

    if(arg === '-t'){
      compiler = 'TypeScript'
    }
    if(arg === '-p'){
      compiler = 'Python'
    }
    if(arg === '-l'){
      compiler = 'Lua'
    }
    if(arg == "-f"){
      filePath = args[i + 1]
    }
  
    
  });


  console.log("Arguments: ", {
    cleanMode,
    filePath,
    compiler
  });

  return {argsProvided, cleanMode, compiler, filePath }
}
