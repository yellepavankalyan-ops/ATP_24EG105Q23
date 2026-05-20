import { useContext } from "react"
import { counterContextObj } from "../context/ContextProvider"
import { useCounterStore } from "../Store/CounterStore";
function Home() {
  //call useCounterStore hook to get state fo Zustand store
  let { newCounter , incrementCounter }= useCounterStore();
  const { counter , changeCounter }= useContext(counterContextObj);
  console.log("HOME");
 
  return (   
    <div>
      <h1 className="text-4xl">Counter :{ counter }</h1>     
      <button  onClick={changeCounter} className="bg-amber-300">change</button>
      <h1 className="text-4xl"> newCounter:{newCounter}</h1>
      <button onClick={incrementCounter} className="bg-blue-300">incrementCounter</button>
     </div>
  )
}

export default Home
