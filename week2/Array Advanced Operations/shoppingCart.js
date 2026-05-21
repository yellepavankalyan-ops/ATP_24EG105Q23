// ASSIGNMENT 1:
// -------------
// You are building a shopping cart summary for an e-commerce website.

// Test Data : 
// const cart = [
//   { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
//   { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
//   { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
//   { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true }
// ];

// Tasks:
//     1. Use filter() to get only inStock products
//     2. Use map() to create a new array with:  { name, totalPrice }
//     3. Use reduce() to calculate grand total cart value
//     4. Use find() to get details of "Mouse"
//     5. Use findIndex() to find the position of "Keyboard"



const cart = [
  { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
  { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true }
];
//1
//1.1
let r=cart.filter(cartObj=>cartObj.inStock==true)
console.log(r)
//1.2
 let r1=cart.map(cartObj=>{
    return {name:cartObj.name,totalPrice:cartObj.price}
})
console.log(r1)
//1.3
let r2=cart.reduce((acc,element)=>acc+(element.price*element.quantity),0)
console.log(r2)

//1.4
let r3=cart.find(element=>element.name=="Mouse")
console.log(r3)

//1.5
let r4=cart.findIndex(element=>element.name=="Keyboard")
console.log(r4)

