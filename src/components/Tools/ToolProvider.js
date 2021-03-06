import { useState, createContext } from "react"

//asigns a way to pass data w/o having to pass props manually by using createContext
export const ToolContext = createContext()

export const ToolProvider = (props) => {

    //useState stores data about component
    const [tools, setTools] = useState([])

    const getTools = () => {
        return fetch("http://localhost:8088/tools")
        .then(response => response.json())
        .then(setTools)
    }
        const addTool = toolObj => {
            return fetch("http://localhost:8088/tools",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(toolObj)
            })
            .then(getTools)
        }
        
        const useTools = () => {
            return tools.slice
        }
        
    return (
        <ToolContext.Provider value={{
            tools, getTools, addTool, useTools
        }}>
            {props.children}
        </ToolContext.Provider>
    )
}