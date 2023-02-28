import inquirer from 'inquirer';
// Generate a random 5-digit ID
function generateID() {
    const id = Math.floor(Math.random() * 90000) + 10000;
    return id.toString();
}
// Prompt the user to enter the student's name, and generate an ID for them
async function addStudent() {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the student's name?",
        },
    ]);
    const id = generateID();
    console.log(`Student ${name} has been assigned ID ${id}.`);
}
// Call the addStudent function to start the process
export default addStudent();
