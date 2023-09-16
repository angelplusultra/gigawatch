import fs from "fs";
import path from "path";

export function validateFileExistence(filePath, fileType) {
  console.log(fileType, filePath);
	const validFileTypes = ['.lua', '.js', '.ts', '.py']

  try {
	if(!validFileTypes.includes(fileType)){
		throw "File must be of valid extension .js, .ts, .py or .lua"
	} else if (!fs.existsSync(filePath)) {
      throw "File does not exist";
    } else if (path.extname(filePath) !== fileType) {
      throw `File is of incorrect file type, file needs a ${fileType} extension`;
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
