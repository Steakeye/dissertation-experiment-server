const fsExtra = require("fs-extra");
const path = require("path");

const targetDir = path.join(__dirname, '../views');

console.log("attempting to copying views to build folder");

fsExtra.copySync(targetDir, path.join(__dirname, '../build/views'));

console.log("Copying views complete!");

