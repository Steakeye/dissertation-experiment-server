const fsExtra = require("fs-extra");
const path = require("path");

const targetDir = path.join(__dirname, '../views');

console.log("attempting to copying views to build folder");
//console.log("current dir: " + __dirname);
//console.log("target dir: " + targetDir);

fsExtra.copySync(targetDir, path.join(__dirname, '../build/views'));

console.log("Copying views complete!");

