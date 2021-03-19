import { useState, createContext } from "react"

export const MaterialContext = createContext()

export const MaterialProvider = (props) => {

    //useState stores data about component
    const [materials, setMaterials] = useState([])

    const getMaterials = () => {
        return fetch("http://localhost:8088/materials")
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