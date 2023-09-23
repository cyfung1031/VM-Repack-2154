#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const JSZip = require('jszip');
const fs = require('fs/promises');
const path = require('path');

const argv = yargs(hideBin(process.argv))
    .option('file', {
        alias: 'f',
        type: 'string',
        description: 'Path to the zip file',
        demandOption: true,
    })
    .option('textFile', {
        alias: 't',
        type: 'string',
        description: 'Name of the text file to edit inside the zip file',
        default: 'options/index.js',
    })
    .option('suffix', {
        alias: 's',
        type: 'string',
        description: 'Suffix to append to the original file name if provided',
    })
    .option('output', {
        alias: 'o',
        type: 'string',
        description: 'Path to save the edited zip file'
    }).argv;

function getOutputPath() {
    if (argv.suffix) {
        const originalName = path.basename(argv.file, path.extname(argv.file));
        const dirName = path.dirname(argv.file);
        return path.join(dirName, `${originalName}${argv.suffix}${path.extname(argv.file)}`);
    }
    return argv.output || argv.file; // if output is not explicitly set, default to input file
}

function editContent(content) {
    return content
        .replace(/\.readOnly/g, '.ReadOnly')
        .replace(/readOnly/g, 'readOnlY')
        .replace(/\.canEdit=!1/g, '.canEdit=!0');
}

async function run() {
    try {
        const inputFile = argv.file;
        const ext = path.extname(inputFile).toLowerCase();

        try {
            await fs.access(inputFile);
        } catch {
            console.error(`Error: File ${inputFile} does not exist.`);
            process.exit(1);
        }

        const outputPath = getOutputPath();

        if (ext === '.zip') {

            // Read the Zip file
            const zipBuffer = await fs.readFile(inputFile);
            const zip = new JSZip();
            await zip.loadAsync(zipBuffer);

            // Find and Edit the Text File
            const textFile = zip.file(argv.textFile);
            if (!textFile) {
                console.error(`${argv.textFile} does not exist in the zip file.`);
                console.log('List of files in the zip file:');
                zip.forEach((relativePath, zipEntry) => {
                    console.log(relativePath);
                });
                return;
            }

            let content = await textFile.async('string');
            content = editContent(content);
            
            // https://github.com/Stuk/jszip/issues/369
            const _defaultDate = JSZip.defaults.date;
            const currDate = new Date();
            const dateWithOffset = new Date(currDate.getTime() - currDate.getTimezoneOffset() * 60000);
            JSZip.defaults.date = dateWithOffset;
            zip.file(argv.textFile, content); // Replace with the edited content
            JSZip.defaults.date = _defaultDate;

            // Write the modified Zip file back to disk
            const outputBuffer = await zip.generateAsync({ type: 'nodebuffer' });

            await fs.writeFile(outputPath, outputBuffer);

            console.log(`Modified zip file saved to ${outputPath}`);
        } else if (ext === '.js') {
            let content = await fs.readFile(inputFile, 'utf-8');
            content = editContent(content);
            await fs.writeFile(outputPath, content, 'utf-8');
            console.log(`Modified js file saved to ${outputPath}`);
        } else {
            console.error('Error: The input file should be a js or a zip file.');
            process.exit(1);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

run();
