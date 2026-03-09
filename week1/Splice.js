const employees = [
  {
    eno: 101,
    name: "Ravi",
    marks: [78, 82, 91],
  },
  {
    eno: 102,
    name: "Bhanu",
    marks: [65, 70, 68],
  },
  {
    eno: 103,
    name: "Sneha",
    marks: [88, 92, 95],
  },
  {
    eno: 104,
    name: "Kiran",
    marks: [55, 60, 58],
  },
  {
    eno: 105,
    name: "Anitha",
    marks: [90, 85, 87],
  },
];
//1. Insert new Emp at at 2nd position
//2.remove an emp with name "Kiran"
//3.Change the las marks 95 to 75 of emp "Sneha"
//1
employees.splice(1,0,{eno:111,name:"rahul",marks:[90,98,30]})//adding new emp at second postion 
console.log(employees)
//2

let search=function(a,search){
    for(i=0;i<a.length;i++){
        if(a[i].name==search)
            return i
        
    }
}
let index=search(employees,"Kiran")
employees.splice(index,1)
console.log(employees)// Remove an emp with name "Kiran"
//3

index=search(employees,"Sneha")
employees[i].marks[2]=75
console.log(employees)// 3.Change the last mark 95 to 75 of emp  "Sneha"
