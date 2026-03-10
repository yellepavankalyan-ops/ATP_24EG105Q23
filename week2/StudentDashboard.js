
// ASSIGNMENT 2:
// -------------
// Student Performance Dashboard

// You are working on a college result analysis system.

// Test Data:
// const students = [
//   { id: 1, name: "Ravi", marks: 78 },
//   { id: 2, name: "Anjali", marks: 92 },
//   { id: 3, name: "Kiran", marks: 35 },
//   { id: 4, name: "Sneha", marks: 88 },
//   { id: 5, name: "Arjun", marks: 40 }
// ];

// Tasks:
//     1. filter() students who passed (marks ≥ 40)
//     2. map() to add a grade field
//               ≥90 → A
//               ≥75 → B
//               ≥60 → C
//               else → D

//    3. reduce() to calculate average marks
//    4. find() the student who scored 92
//    5. findIndex() of student "Kiran"



//2.1
const students = [
  { id: 1, name: "Ravi", marks: 78 },
  { id: 2, name: "Anjali", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 }
];
// 1 students who passed
let r5 = students.filter(s => s.marks >= 40);
console.log(r5);

// 2. grade field
let r6 = students.map(s => {
  let grade;

  if (s.marks >= 90) grade = "A";
  else if (s.marks >= 75) grade = "B";
  else if (s.marks >= 60) grade = "C";
  else grade = "D";

  return { ...s, grade };
});
console.log(r6);

// 3. average marks
let totalMarks = students.reduce((acc, s) => acc + s.marks, 0);
let r7 = totalMarks / students.length;
console.log(r7);

// 4. find marks 92
let r8 = students.find(s => s.marks === 92);
console.log(r8);

// 5. findIndex Kiran
let r9 = students.findIndex(s => s.name === "Kiran");
console.log(r9);
