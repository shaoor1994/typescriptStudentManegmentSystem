import inquirer from 'inquirer';

interface Student {
  name: string;
  id: string;
  balance: number;
  courses: string[];
}

const students: Student[] = [
  {
    name: 'John',
    id: '12345',
    balance: 1000,
    courses: ['Math', 'Science'],
  },
  {
    name: 'Mary',
    id: '67890',
    balance: 500,
    courses: ['History'],
  },
];

// Find a student by their ID
function findStudent(studentId: string): Student | undefined {
  return students.find((student) => student.id === studentId);
}

// Prompt the user to enter their student ID
async function enterStudentId(): Promise<string> {
  const { studentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'studentId',
      message: 'Enter your student ID:',
    },
  ]);
  return studentId;
}

// Display a student's balance
async function viewBalance() {
  const studentId = await enterStudentId();
  const student = findStudent(studentId);
  if (!student) {
    console.log('Student not found.');
  } else {
    console.log(`Your balance is $${student.balance}.`);
  }
}

// Prompt the user to enter an amount to pay towards their tuition balance
async function enterPaymentAmount(student: Student): Promise<number> {
  const { paymentAmount } = await inquirer.prompt([
    {
      type: 'number',
      name: 'paymentAmount',
      message: `Your balance is $${student.balance}. How much would you like to pay towards your tuition?`,
      validate: (value) => {
        if (isNaN(value) || value <= 0) {
          return 'Please enter a positive number.';
        }
        if (value > student.balance) {
          return 'You cannot pay more than your balance.';
        }
        return true;
      },
    },
  ]);
  return paymentAmount;
}

// Pay tuition for a student
async function payTuition() {
  const studentId = await enterStudentId();
  const student = findStudent(studentId);
  if (!student) {
    console.log('Student not found.');
  } else {
    const paymentAmount = await enterPaymentAmount(student);
    student.balance -= paymentAmount;
    console.log(`Your payment of $${paymentAmount} has been processed. Your new balance is $${student.balance}.`);
  }
}

// Display the fees status for a student's courses
async function viewFeesStatus() {
  const studentId = await enterStudentId();
  const student = findStudent(studentId);
  if (!student) {
    console.log('Student not found.');
  } else {
    console.log(`Fees status for ${student.name}:`);
    for (const course of student.courses) {
      console.log(`${course}: Paid`);
    }
  }
}

// Call the desired function to perform the corresponding action based on user input
async function run() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select an action:',
      choices: [
        { name: 'View balance', value: viewBalance },
        { name: 'Pay tuition', value: payTuition },
        { name: 'View fees status', value: viewFeesStatus },
      ],
    },
  ]);
  await action();
}

// Call the run function to start the program
export default run();
