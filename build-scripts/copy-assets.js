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

function removeMessage(type) {
    console.log(`Removing existing ${type} assets in public folder`);
}

function copyMessage(type) {
    console.log(`Attempting to copying ${type} assets to build folder`);
}

function doneMessage(type) {
    console.log(`${type} done!`);
}

if (cLOptions.scss) {
    const sassPathFragment = "scss/";
    const customSassPath = `${assetsLibsPath}${sassPathFragment}`;
    const sassSourceDir = path.join(__dirname, customSassPath);

    removeMessage("scss");

    fsExtra.removeSync(path.join(__dirname, `${targetPath}${sassPathFragment}`));

    copyMessage("scss");

    fsExtra.copySync(sassSourceDir, path.join(__dirname, `${targetPath}${sassPathFragment}`));

    doneMessage("scss")
}

if (cLOptions.js) {
    removeMessage("js");

    fsExtra.removeSync(path.join(__dirname, `${targetPath}${jsPathFragment}`));

    const createJSLibFile = "createjs.js";
    const createJSSourcePath = path.join(__dirname, `${nodeLibsPath}createjs/builds/1.0.0/${createJSLibFile}`);
    const sizzleJSLibFile = "sizzle.js";
    const sizzleJSSourcePath = path.join(__dirname, `${nodeLibsPath}sizzle/dist/${sizzleJSLibFile}`);

    copyMessage("js");

    fsExtra.copySync(createJSSourcePath, path.join(__dirname, `${targetPath}${jsPathFragment}${createJSLibFile}`));
    fsExtra.copySync(sizzleJSSourcePath, path.join(__dirname, `${targetPath}${jsPathFragment}${sizzleJSLibFile}`));

    doneMessage("js");
}

if (cLOptions.img) {
    removeMessage("img");

    fsExtra.removeSync(path.join(__dirname, `${targetPath}${imgPathFragment}`));

    const imgPath = `${assetsLibsPath}${imgPathFragment}`;
    const imgSourceDir = path.join(__dirname, imgPath);

    copyMessage("img");

    fsExtra.copySync(imgSourceDir, path.join(__dirname, `${targetPath}${imgPathFragment}`));

    doneMessage("img");
}

if (cLOptions.other) {
    removeMessage("other");

    fsExtra.removeSync(path.join(__dirname, `${targetPath}${otherPathFragment}`));

    const otherPath = `${assetsLibsPath}${otherPathFragment}`;
    const otherSourceDir = path.join(__dirname, otherPath);

    copyMessage("other");

    fsExtra.copySync(otherSourceDir, path.join(__dirname, `${targetPath}${otherPathFragment}`));

    copyMessage("other");
}

console.log("Copying assets complete!");
