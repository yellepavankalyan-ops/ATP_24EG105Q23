import {createContext, useState} from 'react'

export const counterContextObj=createContext();

function ContextProvider({ children }) {
  const [counter, setCounter] = useState(0);

  const changeCounter = () => {
    setCounter(counter - 1);
  };

  return (
    <counterContextObj.Provider
      value={{ counter,changeCounter}}
    >
      {children}   
    </counterContextObj.Provider>
  );
}

export default ContextProvider
