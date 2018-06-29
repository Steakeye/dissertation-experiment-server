const fsExtra = require("fs-extra");
const path = require("path");

const jsPathFragment = 'js/';
const cssPathFragment = 'css/';
const nodeLibsPath = "../node_modules/";
const targetPath = '../public/';

const bulmaCss = `${cssPathFragment}bulma.css`;
const bulmaCssSourcePath = `${nodeLibsPath}bulma/${bulmaCss}`;

const bulmaSourceDir = path.join(__dirname, bulmaCssSourcePath);

console.log("Removing existing css assets in public folder");

fsExtra.removeSync(path.join(__dirname, `${targetPath}${cssPathFragment}`));

console.log("Attempting to copying css assets to build folder");

fsExtra.copySync(bulmaSourceDir, path.join(__dirname, `${targetPath}${bulmaCss}`));

/*fsExtra.pathExists(bulmaSourceDir).then((val) => {
    console.log(val);
}).catch((val) => {
    console.log(val);
});*/

const assetsLibsPath = "../assets/";
const sassPathFragment = "scss/";
const customSassFragment = `${sassPathFragment}custom.scss`;
const customSassPath = `${assetsLibsPath}${sassPathFragment}`;
const sassSourceDir = path.join(__dirname, customSassPath);

console.log("Removing existing scss assets in public folder");

fsExtra.removeSync(path.join(__dirname, `${targetPath}${sassPathFragment}`));

fsExtra.copySync(sassSourceDir, path.join(__dirname, `${targetPath}${sassPathFragment}`));

console.log("Removing existing js assets in public folder");

fsExtra.removeSync(path.join(__dirname, `${targetPath}${jsPathFragment}`));

const createJSLibFile = "createjs.js";
const createJSSourcePath = path.join(__dirname, `${nodeLibsPath}createjs/builds/1.0.0/${createJSLibFile}`);

console.log("Attempting to copying js assets to build folder");

fsExtra.copySync(createJSSourcePath, path.join(__dirname, `${targetPath}${jsPathFragment}${createJSLibFile}`));

console.log("Copying assets complete!");

