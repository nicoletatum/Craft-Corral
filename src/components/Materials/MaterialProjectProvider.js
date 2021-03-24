import { useState, createContext } from "react"

//context allows a way to pass data through components tree w/o having to pass props DOWN manually at every level
export const ProjectMaterialContext = createContext()

export const ProjectMaterialProvider = (props) => {

    //useState stores data about projectsMaterials and setProjectsMaterials
    const [projectsMaterials, setProjectsMaterials] = useState([])

    const getProjectsMaterials = () => {
        return fetch("http://localhost:8088/projectsMaterials?_expand=material")
        .then(response => response.json())
        .then(setProjectsMaterials)
    }

    const getProjectMaterialById = (id) => {
        return fetch(`http://localhost:8088/projectsMaterials/${id}`)
            .then(res => res.json())
    }

    //addprojectmaterial. to add all of the materials to project materials 

    // const addprojectMaterial = projectMaterialObj => {
    //     return fetch("http://localhost:8088/projectsMaterials",{
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(projectMaterialObj)
    //     })
    //         .then(getProjectsMaterials)
    // }

    //allows access to children of "props"??
    return (
        <ProjectMaterialContext.Provider value={{
            projectsMaterials, getProjectsMaterials, getProjectMaterialById
        }}>
            {props.children}
        </ProjectMaterialContext.Provider>
    )
}