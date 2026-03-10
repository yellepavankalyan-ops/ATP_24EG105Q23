
// ASSIGNMENT 3:
// -------------
// Employee Payroll Processor

// You are building a salary processing module in a company HR app.

// Test data:
// const employees = [
//   { id: 201, name: "Amit", salary: 45000, department: "IT" },
//   { id: 202, name: "Neha", salary: 60000, department: "HR" },
//   { id: 203, name: "Rahul", salary: 75000, department: "IT" },
//   { id: 204, name: "Pooja", salary: 30000, department: "Sales" }
// ];

// Tasks:
//     1. filter() employees from IT department
//     2. map() to add:
//             netSalary = salary + 10% bonus

//     3. reduce() to calculate total salary payout
//     4. find() employee with salary 30000
//     5. findIndex() of employee "Neha"

const employees = [
  { id: 201, name: "Amit", salary: 45000, department: "IT" },
  { id: 202, name: "Neha", salary: 60000, department: "HR" },
  { id: 203, name: "Rahul", salary: 75000, department: "IT" },
  { id: 204, name: "Pooja", salary: 30000, department: "Sales" }
];

// 1. IT employees
let itEmp = employees.filter(e => e.department === "IT");
console.log(itEmp);

// 2. add netSalary
let bonusEmp = employees.map(e => {
  return { ...e, netSalary: e.salary * 1.1 };
});
console.log(bonusEmp);

// 3. total salary payout
let totalSalary = employees.reduce((acc, e) => acc + e.salary, 0);
console.log(totalSalary);

// 4. salary 30000
let r3 = employees.find(e => e.salary === 30000);
console.log(r3);

// 5. findIndex Neha
let r4= employees.findIndex(e => e.name === "Neha");
console.log(r4);
