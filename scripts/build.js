#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { minify } = require('terser');

const ROOT = path.resolve(__dirname, '..');
const TEMPLATES_DIR = path.join(ROOT, 'templates');

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

function writeFile(filePath, content) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content);
}

function renderTemplate(template, data) {
    return template.replace(/<%=\s*([a-zA-Z0-9_]+)\s*%>/g, function (_, key) {
        return Object.prototype.hasOwnProperty.call(data, key) ? String(data[key]) : '';
    });
}

function listJavaScriptFiles(dirPath) {
    return fs
        .readdirSync(dirPath)
        .filter(function (name) {
            return name.endsWith('.js');
        })
        .sort();
}

function extractFactoryBody(source, sourcePath) {
    const match = source.match(/\}\(this,\s*function\s*\(numeral\)\s*\{\s*([\s\S]*?)\s*\}\)\);\s*$/);

    if (!match) {
        throw new Error('Could not extract factory body from ' + sourcePath);
    }

    return match[1];
}

function compileType(type, version) {
    const sourceDir = path.join(ROOT, 'src', type);
    const anonTemplate = readFile(path.join(TEMPLATES_DIR, 'anon.js'));
    const wrapperTemplate = readFile(path.join(TEMPLATES_DIR, 'types.js'));
    const files = listJavaScriptFiles(sourceDir);
    let content = '';

    files.forEach(function (fileName) {
        const sourcePath = path.join(sourceDir, fileName);
        const source = readFile(sourcePath);
        const body = extractFactoryBody(source, sourcePath);

        content += '\n' + renderTemplate(anonTemplate, { content: body }) + '\n';
    });

    writeFile(path.join(ROOT, 'temp', type + '.js'), content);

    if (type === 'locales') {
        writeFile(
            path.join(ROOT, 'locales.js'),
            renderTemplate(wrapperTemplate, {
                type: type,
                version: version,
                content: content
            })
        );
    }

    return content;
}

function compileNumeral(formatsContent) {
    const sourcePath = path.join(ROOT, 'src', 'numeral.js');
    const outputPath = path.join(ROOT, 'numeral.js');
    const source = readFile(sourcePath);
    const marker = 'return numeral;';
    const markerIndex = source.indexOf(marker);

    if (markerIndex === -1) {
        throw new Error('Could not find "' + marker + '" in ' + sourcePath);
    }

    writeFile(outputPath, source.slice(0, markerIndex) + '\n' + formatsContent + source.slice(markerIndex));
}

function copyLocales() {
    const sourceDir = path.join(ROOT, 'src', 'locales');
    const outputDir = path.join(ROOT, 'locales');
    const files = listJavaScriptFiles(sourceDir);

    fs.mkdirSync(outputDir, { recursive: true });

    files.forEach(function (fileName) {
        fs.copyFileSync(path.join(sourceDir, fileName), path.join(outputDir, fileName));
    });
}

async function minifyFile(inputPath, outputPath) {
    const source = readFile(inputPath);
    const result = await minify(source);

    if (!result.code) {
        throw new Error('Minification produced empty output for ' + inputPath);
    }

    writeFile(outputPath, result.code + '\n');
}

async function minifyDistribution() {
    const sourceLocalesDir = path.join(ROOT, 'src', 'locales');
    const minLocalesDir = path.join(ROOT, 'min', 'locales');
    const localeFiles = listJavaScriptFiles(sourceLocalesDir);

    for (const fileName of localeFiles) {
        await minifyFile(
            path.join(sourceLocalesDir, fileName),
            path.join(minLocalesDir, fileName.replace(/\.js$/, '.min.js'))
        );
    }

    await minifyFile(path.join(ROOT, 'numeral.js'), path.join(ROOT, 'min', 'numeral.min.js'));
    await minifyFile(path.join(ROOT, 'locales.js'), path.join(ROOT, 'min', 'locales.min.js'));
}

async function main() {
    const command = process.argv[2] || 'build';
    const validCommands = ['build', 'dist'];

    if (!validCommands.includes(command)) {
        throw new Error('Unknown command "' + command + '". Use: build or dist.');
    }

    const version = JSON.parse(readFile(path.join(ROOT, 'package.json'))).version;
    compileType('locales', version);
    const formatsContent = compileType('formats', version);
    compileNumeral(formatsContent);
    copyLocales();

    if (command === 'dist') {
        await minifyDistribution();
    }
}

main().catch(function (error) {
    console.error(error.stack || error.message);
    process.exit(1);
});
