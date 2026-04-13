import { useState } from "react";

function Counter(){
    //state
    const [count,setCount] = useState(0);

    //functions to modify the state
    const increment = () => {
        setCount(count+1);
    };

    const decrement = () => {
        setCount(count-1)
    }

    //return
    return (
        <div className="text-center p-10 border m-3">
            <h1 className="text-6xl">Count:{count}</h1>
            <button className="bg-red-500 p-3" onClick={increment}>+</button>
            <button className="bg-green-500 p-3" onClick={decrement}>-</button>
        </div>
    )
}

export default Counter;
