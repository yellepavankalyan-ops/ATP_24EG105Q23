import {create} from 'zustand';

export const userCouterStore= create((set) =>({
    //state
    newCounter:0,
    newCounter1:100,
    //add user state {name,age,email}
    user:{name:"ravi",email:"ravi@mail.com",age:22},

    //function to change email
    changeEmail:() => set({...user,email:"test@email.com"}),
    //functions to modify the state
    incrementCounter:() =>set(state =>({newCounter:state.newCounter+1})),
    decrementCounter:() =>set(state =>({newCounter:state.newCounter-1})),
    reset:() => set({newCounter:0})
}));