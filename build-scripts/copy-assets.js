const fsExtra = require("fs-extra");
const path = require("path");

const jsPathFragment = 'js/';
const cssPathFragment = 'css/';
const nodeLibsPath = "../node_modules/";
const targetPath = '../public/';

const bulmaCss = `${cssPathFragment}bulma.css`;
const bulmaCssSourcePath = `${nodeLibsPath}bulma/${bulmaCss}`;

const sourceDir = path.join(__dirname, bulmaCssSourcePath);

console.log("Removing existing css assets in public folder");

fsExtra.removeSync(path.join(__dirname, `${targetPath}${cssPathFragment}`));

console.log("Attempting to copying css assets to build folder");

/*fsExtra.pathExists(sourceDir).then((val) => {
    console.log(val);
}).catch((val) => {
    console.log(val);
});*/

fsExtra.copySync(sourceDir, path.join(__dirname, `${targetPath}${bulmaCss}`));

console.log("Removing existing js assets in public folder");

fsExtra.removeSync(path.join(__dirname, `${targetPath}${jsPathFragment}`));

const createJSLibFile = "createjs.js";
const createJSSourcePath = path.join(__dirname, `${nodeLibsPath}createjs/builds/1.0.0/${createJSLibFile}`);

console.log("Attempting to copying js assets to build folder");

fsExtra.copySync(createJSSourcePath, path.join(__dirname, `${targetPath}${jsPathFragment}${createJSLibFile}`));

console.log("Copying assets complete!");

