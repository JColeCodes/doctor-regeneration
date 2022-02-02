// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// TODO: Create an array of questions for user input
// const questions = [];
const projectQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "project",
            message: "What is the name of your project? (Required)",
            validate: projectInput => {
                if (projectInput) {
                    return true;
                } else {
                    console.log("Please enter the name of your project.");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "Enter a description of your project (Required)",
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log("Please enter a description of your project.");
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "license",
            message: "Which license does this project use?",
            choices: ["ISC", "MIT", "Apache 2.0", "GNU GPLv2", "GNU GPLv3", "Boost Software 1.0", "Mozilla Public 2.0", "Unilicense", "No License"],
            default: "No License",
            loop: false
        },
        {
            type: "input",
            name: "command",
            message: "What is the command to run your project? (Required)",
            validate: commandInput => {
                if (commandInput) {
                    return true;
                } else {
                    console.log("Please enter the text command that allows the project to run.");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "packages",
            message: "Does your project require any packages from npm? If so, type them here separated by commas."
        }
    ]);
};

const installQuestions = installData => {
    if (!installData.instructions) {
        installData.instructions = [];
        console.log(
`INSTALLATION INSTRUCTIONS
+ For a more descriptive README, please enter each step one at a time!
+ To insert links or code, please use markup language.
+ You do NOT have to provide a step for installing npm packages`
        );
    }
    return inquirer.prompt([
        {
            type: "input",
            name: "instructions",
            message: "Enter a step for the installation instructions of your project (Required)",
            validate: instructionsInput => {
                if (instructionsInput) {
                    return true;
                } else {
                    console.log("Please enter a description of your project.");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "confirmMoreInstruct",
            message: "Would you like to add another step to the instructions?",
            default: false
        }
    ])
    .then(instructData => {
        installData.instructions.push(instructData.instructions);
        if (instructData.confirmMoreInstruct) {
            return installQuestions(installData);
        } else {
            return installData;
        }
    });
};


// Add Contribution and Tests
const usageQuestions = installData => {
    return inquirer.prompt([
        {
            type: "confirm",
            name: "confirmNPMTest",
            message: "Does your project have a test package from NPM, such as Jest or Mocha?",
            default: true
        }
    ])
    .then(usageChoice => {
        if (!usageChoice.confirmNPMTest) {
            return inquirer.prompt([
                {
                    type: "input",
                    name: "testText",
                    message: "How can one test your project? To insert links or code, please use markup language. (Required)",
                    validate: webpageInput => {
                        if (webpageInput) {
                            return true;
                        } else {
                            console.log("Please enter some text about how one can test your project.");
                            return false;
                        }
                    }
                }
            ]);
        } else {
            return usageChoice;
        }
    })
    .then(test => {
        if (!test.testText) {
            installData.tests = "npmtest";
        } else {
            installData.tests = test.testText;
        }
        return installData;
    })
    .then(installData => {
        return inquirer.prompt([
            {
                type: "input",
                name: "ghUser",
                message: "What is your GitHub username? (Required)",
                validate: ghUserInput => {
                    if (ghUserInput) {
                        return true;
                    } else {
                        console.log("Please enter your GitHub username.");
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "ghRepo",
                message: "What is your project's GitHub repository name? (Required)",
                validate: ghRepoInput => {
                    if (ghRepoInput) {
                        return true;
                    } else {
                        console.log("Please enter your project's GitHub repository name.");
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "email",
                message: "What is your email address? (Required)",
                validate: emailInput => {
                    if (emailInput.includes("@") && emailInput.includes(".")) {
                        return true; // Makes sure user's email has @ and .
                    } else {
                        console.log(" Please enter a valid email address.");
                        return false;
                    }
                }
            }
        ])
    })
    .then(userData => {
        let tempObj = {
            ...installData,
            ...userData
        }
        installData = tempObj;
        return installData;
    });
};

// MOCK DATA!
mockData = {
    project: "Project Name Here",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    license: "ISC",
    command: "node index.js",
    packages: "inquirer, sampletext",
    instructions: ["Rule number one is that you gotta have fun", "But, baby, when you're done, you gotta be the first to run", "Rule number two, just don't get attached to", "Somebody you could lose `So le-let me tell you`"],
    tests: "npmtest",
    ghUser: "JColeCodes",
    ghRepo: "README-generator-challenge-09",
    email: "capauldi@gmail.com"
};

// TODO: Create a function to write README file
const writeToFile = (fileName, data) => {}

// TODO: Create a function to initialize app
const init = () => {
    console.log(
`++++++++++++++++++++++++++++++++
Welcome to the README Generator!
A few questions about your project will be asked, then a README.md file will be generated into the /dist folder.
++++++++++++++++++++++++++++++++`
    );
    // projectQuestions()
    //     .then(installQuestions)
    //     .then(usageQuestions)
    //     .then(installData => {console.log(installData)});
    console.log(generateMarkdown(mockData));
}

// Function call to initialize app
init();
