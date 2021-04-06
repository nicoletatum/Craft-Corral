import { useState, createContext } from "react"
//context provides a way to pass data through components tree w/o having to pass props DOWN manually at every level
export const ProjectMaterialContext = createContext()

export const ProjectMaterialProvider = (props) => {

    //useState stores data about projectsMaterials and setProjectsMaterials
    const [projectsMaterials, setProjectsMaterials] = useState([])

    const getProjectsMaterials = () => {
        return fetch("http://localhost:8088/projectsMaterials?_expand=material&_expand=project")
        .then(res => res.json())
        .then(setProjectsMaterials)
    }

    const getProjectMaterialById = (id) => {
        return fetch(`http://localhost:8088/projectsMaterials/${id}`)
            .then(res => res.json())
    }

    const addProjectMaterial = projectMaterialObj => {
        return fetch("http://localhost:8088/projectsMaterials",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(projectMaterialObj)
        })
            .then(getProjectsMaterials)
    }

    //allows access to and establishes "chlidren" of "props"
    //props.children allows donward communication of data to child compoments without having to grab ALL data?
    return (
        <ProjectMaterialContext.Provider value={{
            projectsMaterials, getProjectsMaterials, getProjectMaterialById, addProjectMaterial
        }}>
            {props.children}
        </ProjectMaterialContext.Provider>
    )
}