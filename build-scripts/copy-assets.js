const fsExtra = require("fs-extra");
const path = require("path");

const cssPathFragment = 'css/';
const bulmaCss = 'css/bulma.css';
const bulmaCssSourcePath = `../node_modules/bulma/${bulmaCss}`;
const targetPath = '../public/';

const sourceDir = path.join(__dirname, bulmaCssSourcePath);

console.log("Removing existing css assets in build folder");

fsExtra.removeSync(path.join(__dirname, `${targetPath}${cssPathFragment}`));

console.log("Attempting to copying css assets to build folder");

/*fsExtra.pathExists(sourceDir).then((val) => {
    console.log(val);
}).catch((val) => {
    console.log(val);
});*/

fsExtra.copySync(sourceDir, path.join(__dirname, `${targetPath}${bulmaCss}`));

console.log("Copying assets complete!");

