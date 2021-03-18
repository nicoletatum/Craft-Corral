import { useState, createContext } from "react"

//context allows a way to pass data through components tree w/o having to pass props DOWN manually at every level
export const ProjectContext = createContext()

export const ProjectProvider = (props) => {

    //useState stores data about component
    const [projects, setProjects] = useState([])

    const getProjects = () => {
        return fetch("http://localhost:8088/projects")
        .then(response => response.json())
        .then(setProjects)
    }

    //DONT FORGET TO COMMENT OUT WHAT THIS IS DOING????
    return (
        <ProjectContext.Provider value={{
            projects, getProjects
        }}>
            {props.children}
        </ProjectContext.Provider>
    )
}