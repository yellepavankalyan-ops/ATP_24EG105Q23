//AvgMarks
let student1={
   
    marks:[90,80,90],

    avgmarks: function()
    {
    
        let sum=0
        for(let i of this.marks)
            {
         sum+=i
        }
        return sum/this.marks.length
    }

}
console.log(student1.avgmarks())