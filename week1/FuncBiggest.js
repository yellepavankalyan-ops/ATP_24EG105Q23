//5.Write a function that recivers 3 number args and return the big number
let Biggest=function( a, b,c){
    if(a>b&&a>c)
        {
        console.log("big",a)
    }
    else if(b>a&&b>c)
    {
        console.log("big",b)
    }
    else if(c>a&&c>b)
    {
        console.log("big",c)
    }
    else{
        return 0;
    }

}
Biggest(2,5,7)
