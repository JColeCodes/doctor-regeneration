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
            choices: ["ISC", "MIT", "GNU", "BSD", "Apache", "Mozilla", "Eclipse", "Creative Commons"],
            default: "ISC",
            loop: false
        }
    ]);
};
const installQuestions = installData => {
    if (!installData.instructions) {
        installData.instructions = [];
        console.log("");
    }
    return inquirer.prompt([
        {
            type: "input",
            name: "instructions",
            message: "Enter installation instructions for your project (Required)",
            validate: instructionsInput => {
                if (instructionsInput) {
                    return true;
                } else {
                    console.log("Please enter a description of your project.");
                    return false;
                }
            }
        }
    ]);
};
const userQuestions = () => {
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
    ]);
};

// TODO: Create a function to write README file
const writeToFile = (fileName, data) => {}

// MOCK DATA!
mockData = {
    project: "Project Name Here",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};

// TODO: Create a function to initialize app
const init = () => {
    console.log("Welcome to the README Generator!");
    console.log("A few questions about your project will be asked, then a README.md file will be generated into the /dist folder.");
    projectQuestions();
}

// Function call to initialize app
init();
