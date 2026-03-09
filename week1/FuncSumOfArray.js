//6.Write a function that recives an array as arg and return their sum

function sumOfArray(a)
{
  let sum=0;
  for(let i=0;i<a.length;i++){
    sum+=a[i];
  }  
 
  return sum;
}
console.log(sumOfArray([10,20,30]));
