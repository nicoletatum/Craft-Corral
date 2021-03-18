import { useState, createContext } from "react"

//context allows a way to pass data through components tree w/o having to pass props DOWN manually at every level
export const ProjectContext = createContext()

export const ProjectProvider = (props) => {

    //useState stores data about component
    const [projects, setProjects] = useState([])

    const getProjects = () => {
        return fetch("http://localhost:8088/projects?_expand=category")
        .then(response => response.json())
        .then(setProjects)
    }

    // const getProjectlById = (id) => {
    //     return fetch(`http://localhost:8088/projects/${id}`)
    //         .then(res => res.json())
    // }

    const addProject = projectObj => {
        return fetch("http://localhost:8088/projects",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(projectObj)
        })
            .then(getProjects)
    }

    //DONT FORGET TO COMMENT OUT WHAT THIS IS DOING????
    return (
        <ProjectContext.Provider value={{
            projects, getProjects, addProject
        }}>
            {props.children}
        </ProjectContext.Provider>
    )
}