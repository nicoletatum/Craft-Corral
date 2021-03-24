// import { useState, createContext } from "react"

// export const ToolMaterialContext = createContext()

// export const {ToolMaterialProvider} = (props) => {

//     //useState stores data about component
//     const [toolsMaterials, setToolsMaterials] = useState([])

//     const getProjectsTools = () => {
//         return fetch("http://localhost:8088/projectsTools")
//         .then(response => response.json())
//         .then(setMaterials)
//     }

//     // const getProjectlById = (id) => {
//     //     return fetch(`http://localhost:8088/projects/${id}`)
//     //         .then(res => res.json())
//     // }

//     //addprojectmaterial. to add all of the materials to project materials 

//     const addprojectMaterial = projectMaterialObj => {
//         return fetch("http://localhost:8088/projectsMaterials",{
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(projectMaterialObj)
//         })
//             .then(getProjectsMaterials)
//     }

//     //DONT FORGET TO COMMENT OUT WHAT THIS IS DOING????
//     return (
//         <ProjectMaterialContext.Provider value={{
//             projectsMaterials, getProjectsMaterials, addProjectsMaterial
//         }}>
//             {props.children}
//         </ProjectMaterialContext.Provider>
//     )
// }