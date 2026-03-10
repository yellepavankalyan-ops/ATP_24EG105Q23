// 💡 Exercise 3: Create a function that receives any number of args as arguments and return their sum using REST parameter
function findSum(...a){
    console.log("sum of the elements",a.reduce((sum,ele)=>sum+ele))
}
findSum(10,20,30)