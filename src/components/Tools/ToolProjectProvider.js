import { useState, createContext } from "react"
//context provides a way to pass data through components tree w/o having to pass props DOWN manually at every level
export const ProjectToolContext = createContext()

export const ProjectToolProvider = (props) => {

    //useState stores data about component
    const [projectsTools, setProjectsTools] = useState([])

    const getProjectsTools = () => {
        return fetch("http://localhost:8088/projectsTools?_expand=tool&_expand=project")
        .then(response => response.json())
        .then(setProjectsTools)
    }

    const getProjectToolById = (id) => {
        return fetch(`http://localhost:8088/projects/${id}`)
            .then(res => res.json())
    }

    const addProjectTool = projectToolObj => {
        return fetch("http://localhost:8088/projectsTools",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(projectToolObj)
        })
            .then(getProjectsTools)
    }

    return (
        <ProjectToolContext.Provider value={{
            projectsTools, getProjectsTools, addProjectTool, getProjectToolById
        }}>
            {props.children}
        </ProjectToolContext.Provider>
    )
}