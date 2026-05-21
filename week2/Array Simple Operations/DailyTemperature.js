// Assignment 1: Daily Temperature Analyzer
// ----------------------------------------
// Scenario : You are analyzing daily temperatures recorded by a weather app.

// Test data:
// const temperatures = [32, 35, 28, 40, 38, 30, 42];

// Tasks:
//     1. filter() temperatures above 35
//     2. map() to convert all temperatures from Celsius → Fahrenheit
//     3. reduce() to calculate average temperature
//     4. find() first temperature above 40
//     5. findIndex() of temperature 28
const temp=[32, 35, 28, 40, 38, 30, 42]
//1
let result=temp.filter(temp=>temp>35)
console.log(result)
//2
let r3=temp.map(acc=>(acc*9/5)+35)

 console.log(r3)//celcius iinto farenhit
 //3
 let r4=temp.reduce((acc,element)=>acc+element)
 console.log(r4/temp.length)
//4
let r5=temp.find(element=>element>40)
console.log(r5)
//5
let r6=temp.findIndex(element=>element==28)
console.log(r6)
