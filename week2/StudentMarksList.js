//  Assignment 3: Student Marks List
// --------------------------------
// Scenario : You receive marks from an exam system.

// Test data:
// const marks = [78, 92, 35, 88, 40, 67];

// Tasks:
//     1. filter() marks ≥ 40 (pass marks)
//     2. map() to add 5 grace marks to each student
//     3. reduce() to find highest mark
//     4. find() first mark below 40
//     5. findIndex() of mark 92
//1
const marks = [78, 92, 35, 88, 40, 67];
let r=marks.filter(marks=>marks>=40)
console.log("Passmarks:",r)
//2
let r1=marks.map(marks=>marks+5)
console.log("5 grace marks to each student:",r1)
//3
let r2=marks.reduce((acc,element)=>{
    if(acc>element){
        return acc
    }
    else if(element>acc){
        return element
    }
    else {
        return 0;
    }
})
console.log(r2)
//4
let r3=marks.find(marks=>marks<40)
console.log(r3)
//5
let r4=marks.findIndex(marks=>marks===92)
console.log(r4)
