import { createContext } from "react"
import { useState } from "react"

// Creating Context object
export const counterContextObj = createContext()

function ContextProvider({ children }) {

    // Single shared state (same value across entire app)
    const [counter, setCounter] = useState(0)

    // Function to increase counter
    const increment = () => {
        setCounter(prev => prev + 1)
    }

    // Function to decrease counter
    const decrement = () => {
        setCounter(prev => prev - 1)
    }

    return (
        // Providing state + functions to entire app[children]
        <counterContextObj.Provider value={{ counter, increment, decrement }}>
            {children}
        </counterContextObj.Provider>
    )
}

export default ContextProvider