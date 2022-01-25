// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// List each instruction
function listInstructions(instructions) {
  var instructionText = ``;
  for (let i = 0; i < instructions.length; i++) {
    instructionText += `
${i + 1} ${instructions[i]}`;
  }
  return instructionText;
}
function checkPackages(usage) {
  var requiredPackages = ``;
  if (usage.packages) {
    const { packages } = usage;
    var packageArray = [packages];
    if (packages.includes(",")) {
      packageArray = packages.split(",");
    }
    requiredPackages = `This program requires the following packages from npm: `;
    for (let i = 0; i < packageArray.length; i++) {
      requiredPackages += `
* [${packageArray[i].trim()}](https://www.npmjs.com/package/${packageArray[i].toLowerCase().trim()})
`;
    }
    requiredPackages += `
In order to install all of them, enter the following command into the command line:
\`\`\`
npm i
\`\`\``;
  }
  return requiredPackages;
}

// Create Usage text
function createUsageText(usage) {
  var usageText = ``;
  if (usage.type === "Webpage") {

  } else if (usage.type === "Command") {
    usageText = `In order to run this application, you will need...${usage.packages}
\`${usage.text}\``;
  }
  return usageText;
}

// TODO: Create a function to generate markdown for README
const generateMarkdown = data => {
  return `# ${data.project}
## Description
${data.description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation
To install this project, please follow these steps: ${listInstructions(data.instructions)}

${checkPackages(data.usage)}

## Usage
${createUsageText(data.usage)}

## Contributing

## Tests

## Questions`;
}

module.exports = generateMarkdown;