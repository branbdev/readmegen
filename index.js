const fs = require("fs");
const path = require("path");
const inquirer = require('inquirer');
const lodash = require('lodash');
const axios = require('axios');
const util = require('util');

var markdownpdf = require("markdown-pdf")

//console.log("package is, ", markdownpdf)
//process.exit()

//Questions
const questions = [{
        type: "input",
        name: "github",
        message: "What is your GitHub username?"
    },
    {
        type: "input",
        name: "title",
        message: "What is your project's name?"
    },
    {
        type: "input",
        name: "description",
        message: "Please write a short description of your project"
    },
    {
        type: "list",
        name: "license",
        message: "What kind of license should your project have?",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
    },
    {
        type: "input",
        name: "installation",
        message: "What command should be run to install dependencies?",
        default: "npm i"
    },
    {
        type: "input",
        name: "test",
        message: "What command should be run to run tests?",
        default: "npm test"
    },
    {
        type: "input",
        name: "usage",
        message: "What does the user need to know about using the repo?",
    },
    {
        type: "input",
        name: "contributing",
        message: "What does the user need to know about contributing to the repo?",
    }
];

//Functions

//MARKDOWN
function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(fileName), data);
}

function generateReadmeTemplate(data) {

    const projectTitle = data.title.toLowerCase().split(" ").join("-");
    let projectUrl = `https://github.com/${data.github}/${projectTitle}`;
    let license = '';
    let licenseBadge = '';

    if (data.license !== "None") {
        licenseBadge = `[![GitHub license](https://img.shields.io/badge/license-${data.license}-blue.svg)](${projectUrl})`;
        license = `## License

    This project is licensed under the ${license} license.`

    }




    return `

# ${data.title}
${licenseBadge}

## Description

${data.description}

## Table of Contents 

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Installation

To install necessary dependencies, run the following command:

\`\`\`
${data.installation}
\`\`\`

## Usage

${data.usage}

${license}
    
## Contributing

${data.contributing}

## Tests

To run tests, run the following command:

\`\`\`
${data.test}
\`\`\`

## Questions

![GitHub Avatar](${data.avatar_url})

If you have any questions about the repo, open an issue or contact [${data.github}](${data.url}) directly at ${data.email}.




    `
}

function promptUser() {
    // get github username
    return inquirer
        .prompt(
            questions
        )
}
async function init() {
    try {
        // await till user returns all data needed
        const userResponse = await promptUser();

        // set up query url to...
        const queryUrl = `https://api.github.com/users/${userResponse.github}`;

        //make call to github api
        const gitData = await axios
            .get(queryUrl)
            .then(function (response) {
                return response.data;
            })

        let fullData = {
            ...userResponse,
            ...gitData
        };
        let readmeTempData = generateReadmeTemplate(fullData);
        writeToFile("GenReadMe.md", readmeTempData)

        //let pdfTempData = generatePDF(fullData);
        //writeToFile("readme.pdf", pdfTempData);

        markdownpdf().from("./GenReadMe.md").to("./document.pdf", function () {
            console.log("Done")
        })

    }
    // print error if anything happens along the way
    catch (err) {
        return console.log(err);
    }
}

init();