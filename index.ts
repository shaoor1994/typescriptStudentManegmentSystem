#!/usr/bin/env node 



// import addStudent from "./src/AddStudent.js";
// import enrollStudentInCourse from "./src/CourseEnrollment.js";

// // Call the addStudent function to start the process
// async function MainClass() {

//     case 
//     return  addStudent();
//     return enrollStudentInCourse();
// } 

// await MainClass()

import inquirer from 'inquirer';
import AddStudent from './src/AddStudent.js';
import CourseEnrollment from './src/CourseEnrollment.js';
import FeesStudent from './src/FeesStudent.js';

require('events').EventEmitter.prototype._maxListeners = 100;

async function displayResults() {
  const options = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Choose an option:',
      choices: [
        { name: 'Add Student ', value: 1 },
        { name: 'Enroll in Course', value: 2 },
        { name: 'FeesStudent', value: 3 },
      ],
    },
  ]);

  switch (options.option) {
    case 1:
      const result1 = await getResult1();
      return AddStudent;
      break;
    case 2:
      const result2 = await getResult2();
      CourseEnrollment;
      break;
    case 3:
      const result3 = await getResult3();
      return FeesStudent
      break;
    default:
      console.log('Invalid option');
  }
}

async function getResult1() {
  return 'Result 1';
}

async function getResult2() {
  return 'Result 2';
}

async function getResult3() {
  return 'Result 3';
}

// calling the function to display the results
displayResults();
