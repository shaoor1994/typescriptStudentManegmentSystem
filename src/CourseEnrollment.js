import inquirer from 'inquirer';
const courses = [
    {
        name: 'Math',
        seats: 3,
        students: [],
    },
    {
        name: 'Science',
        seats: 2,
        students: [],
    },
    {
        name: 'History',
        seats: 4,
        students: [],
    },
];
// Find a course by its name
function findCourse(courseName) {
    return courses.find((course) => course.name === courseName);
}
// Prompt the user to select a course from the list
async function selectCourse() {
    const choices = courses.map((course) => ({
        name: `${course.name} (${course.seats - course.students.length} seats available)`,
        value: course,
    }));
    const { course } = await inquirer.prompt([
        {
            type: 'list',
            name: 'course',
            message: 'Select a course to enroll in:',
            choices,
        },
    ]);
    return course;
}
// Prompt the user to enter a student's name and ID, and add them to the course
async function enrollStudent(course) {
    const { name, id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the student's name?",
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the student's ID?",
        },
    ]);
    course.students.push({ name, id });
    console.log(`${name} has been enrolled in ${course.name}.`);
}
// Prompt the user to enroll a student in a course
async function enrollStudentInCourse() {
    const course = await selectCourse();
    if (course.students.length >= course.seats) {
        console.log(`Sorry, ${course.name} is already full.`);
    }
    else {
        await enrollStudent(course);
    }
}
// Call the enrollStudentInCourse function to start the enrollment process
export default enrollStudentInCourse();
