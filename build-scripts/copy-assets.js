commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'scss', alias: 's', type: Boolean },
    { name: 'css', alias: 'c', type: Boolean },
    { name: 'js', alias: 'j', type: Boolean },
    { name: 'img', alias: 'i', type: Boolean },
    { name: 'other', alias: 'o', type: Boolean },
];

let cLOptions = commandLineArgs(optionDefinitions);

let keyCount = 0;

for (prop in cLOptions) {
    ++keyCount;
}

if (!keyCount) {
    cLOptions = {
        scss: true,
        css: true,
        js: true,
        img: true,
        other: true
    };
}

const fsExtra = require("fs-extra");
const path = require("path");

const assetsLibsPath = "../assets/";
const jsPathFragment = 'js/';
const cssPathFragment = 'css/';
const imgPathFragment = 'img/';
const otherPathFragment = 'other/';
const nodeLibsPath = "../node_modules/";
const targetPath = '../public/';

if (cLOptions.css) {
    const bulmaCss = `${cssPathFragment}bulma.css`;
    const bulmaCssSourcePath = `${nodeLibsPath}bulma/${bulmaCss}`;

    const bulmaSourceDir = path.join(__dirname, bulmaCssSourcePath);

    console.log("Removing existing css assets in public folder");

    fsExtra.removeSync(path.join(__dirname, `${targetPath}${cssPathFragment}`));

    console.log("Attempting to copying css assets to build folder");

    fsExtra.copySync(bulmaSourceDir, path.join(__dirname, `${targetPath}${bulmaCss}`));

}

if (cLOptions.scss) {
    const sassPathFragment = "scss/";
    const customSassPath = `${assetsLibsPath}${sassPathFragment}`;
    const sassSourceDir = path.join(__dirname, customSassPath);

    console.log("Removing existing scss assets in public folder");

    fsExtra.removeSync(path.join(__dirname, `${targetPath}${sassPathFragment}`));

    fsExtra.copySync(sassSourceDir, path.join(__dirname, `${targetPath}${sassPathFragment}`));
}

if (cLOptions.js) {
    console.log("Removing existing js assets in public folder");

    fsExtra.removeSync(path.join(__dirname, `${targetPath}${jsPathFragment}`));

    const createJSLibFile = "createjs.js";
    const createJSSourcePath = path.join(__dirname, `${nodeLibsPath}createjs/builds/1.0.0/${createJSLibFile}`);
    const sizzleJSLibFile = "sizzle.js";
    const sizzleJSSourcePath = path.join(__dirname, `${nodeLibsPath}sizzle/dist/${sizzleJSLibFile}`);

    console.log("Attempting to copying js assets to build folder");

    fsExtra.copySync(createJSSourcePath, path.join(__dirname, `${targetPath}${jsPathFragment}${createJSLibFile}`));
    fsExtra.copySync(sizzleJSSourcePath, path.join(__dirname, `${targetPath}${jsPathFragment}${sizzleJSLibFile}`));
}

if (cLOptions.img) {
    console.log("Removing existing img assets in public folder");

    fsExtra.removeSync(path.join(__dirname, `${targetPath}${imgPathFragment}`));

    const imgPath = `${assetsLibsPath}${imgPathFragment}`;
    const imgSourceDir = path.join(__dirname, imgPath);

    console.log("Attempting to copying img assets to build folder");

    fsExtra.copySync(imgSourceDir, path.join(__dirname, `${targetPath}${imgPathFragment}`));
}

if (cLOptions.other) {
    console.log("Removing existing other assets in public folder");

    fsExtra.removeSync(path.join(__dirname, `${targetPath}${otherPathFragment}`));

    const otherPath = `${assetsLibsPath}${otherPathFragment}`;
    const otherSourceDir = path.join(__dirname, otherPath);

    console.log("Attempting to copying other assets to build folder");

    fsExtra.copySync(otherSourceDir, path.join(__dirname, `${targetPath}${otherPathFragment}`));

    console.log("Copying assets complete!");
}
