// Required packages
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);
// array of questions for user
const promptUser= () => { 
    return inquirer.prompt([
{
    type: 'input',
    message: 'What is your GitHub username?',
    name: 'github'
},
{
    type: 'input',
    message: 'What is your email address?',
    name: 'email' 
},
{
    type: 'input',
    message: 'What is your projects name?',
    name: 'project' 
},
{
    type: 'input',
    message: 'Please write a short description of your project.',
    name: 'description' 
},
{
    type: 'list',
    message: "Choose a license for your project. Use arrow keys.",
    choices: ['Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'none'],
    name: 'license'
},
{
    type: 'input',
    message: 'What command should be run to install dependencies?',
    name: 'depend',
    default: 'npm i'
},
{
    type: 'input',
    message: 'What command should be run to run tests?',
    name: 'tests',
    default: 'npm test'
},
{
    type: 'input',
    message: 'What does the user need to know about using the repo?',
    name: 'use' 
},
{
    type: 'input',
    message: 'What does the user need to know about contributing to the repo?',
    name: 'contribution' 
},
]);
};

const generateReadMe = answers => {
    return `# ${answers.project}

## Description:
${answers.description}
  
## Table of Contents:
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions) 
* [License](#license)
  
## Installation
  
To install the nescessary dependencies, run the following command: ${answers.depend}
  
## Usage
${answers.use}
  
## Contributing:
${answers.contribution}
  
## Tests:
To run tests, run the folllowing command: ${answers.tests}
  
## Questions
If you have any questions about the repo, open an issue or reach out to me directly at ${answers.email}. You can find more of my work at https://github.com/${answers.github}

## License
${answers.license}
`;
};

promptUser()
  .then(answers => {
    const readMe = generateReadMe(answers);

    return writeFileAsync('README.md', readMe);
  })
  .then(() => {
    console.log('Successfully wrote to README.md');
  })
  .catch(err => console.log(err));


