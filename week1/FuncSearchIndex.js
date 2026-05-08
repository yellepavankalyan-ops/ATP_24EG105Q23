//7.Write a function that recives an array and search element as args and returns the index of that search eement in the array .it should return "not found "when search element not found
        function SearchArray(arr,ele)
        {
        for(let i=0;i<arr.length;i++)
           {
        if(arr[i]==ele)
         {
       console.log("Found the index of the element is :",i,"The element is:",ele)
              }
         }
        return "NotFound";
        }
       console.log(SearchArray([10,20,30,40],40))