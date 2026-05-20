import { create } from "zustand";

//create store
export const useCounterStore = create((set)=>({
    //state
    newCounter:0,
    newCounter1:100,
    //add user state {name,age,email}
    user:{name:"ravi",email:"ravi@gamil.com",age:21},
    //function to change email
    changeEmail:()=>set({...user,email:"test@mail.com"}),
    //funciton to change name and age
    changeNameAndAge:()=> set({...user,name:"test",age:19}),
    
    //function to modify the state
    incrementCounter:()=>set(state=>({newCounter:state.newCounter+ 1})),
    incrementCounter1:()=>set(state=>({newCounter1:state.newCounter + 1})),
    decrementCounter:()=>set(state=>({newCounter:state.newCounter - 1})), 
    reset:()=>set({newCounter:0})
}));
