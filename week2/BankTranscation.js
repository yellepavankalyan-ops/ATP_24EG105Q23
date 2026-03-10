// ASSIGNMENT 5: 
// -------------
// Bank Transaction Analyzer

// You are building a bank statement summary.

// Test data:
// const transactions = [
//   { id: 1, type: "credit", amount: 5000 },
//   { id: 2, type: "debit", amount: 2000 },
//   { id: 3, type: "credit", amount: 10000 },
//   { id: 4, type: "debit", amount: 3000 }
// ];


// Tasks:
//     1. filter() all credit transactions
//     2. map() to extract only transaction amounts
//     3. reduce() to calculate final account balance
//     4. find() the first debit transaction
//     5. findIndex() of transaction with amount 10000


//     1. Use filter() to get only inStock products
//     2. Use map() to create a new array with:  { name, totalPrice }
//     3. Use reduce() to calculate grand total cart value
//     4. Use find() to get details of "Mouse"
//     5. Use findIndex() to find the position of "Keyboard"

 const transactions = [
  { id: 1, type: "credit", amount: 5000 },
  { id: 2, type: "debit", amount: 2000 },
  { id: 3, type: "credit", amount: 10000 },
  { id: 4, type: "debit", amount: 3000 }
];

// 1. credit transactions using filter
let credits = transactions.filter(t => t.type === "credit");
console.log(credits);

// 2. amounts only using map
let amounts = transactions.map(t => t.amount);
console.log(amounts);

// 3. final balance using reduce 
let balance = transactions.reduce((acc, t) => {
 if(t.type==="credit")
  return acc+t.amount
else
  return acc-t.amount},0)
console.log(balance);

// 4. first debit using find 
let f7 = transactions.find(t => t.type === "debit");
console.log(f7);

// 5. findIndex amount 10000
let f8 = transactions.findIndex(t => t.amount === 10000);
console.log(f8);
