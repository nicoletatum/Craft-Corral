import { useState, createContext } from "react"
//context allows a way to pass data through components tree w/o having to pass props DOWN manually at every level
export const MaterialContext = createContext()

export const MaterialProvider = (props) => {
    
    //useState stores data about component
    const [materials, setMaterials] = useState([])

    const getMaterials = () => {
        return fetch("http://localhost:8088/materials")
        .then(response => response.json())
        .then(setMaterials)
    }

    // const getProjectlById = (id) => {
    //     return fetch(`http://localhost:8088/projects/${id}`)
    //         .then(res => res.json())
    // }

    //addMaterial. to add all of the materials to project materials 
    const addMaterial = materialObj => {
        return fetch("http://localhost:8088/materials",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(materialObj)
        })
            .then(getMaterials)
    }

    //DONT FORGET TO COMMENT OUT WHAT THIS IS DOING????
    return (
        <MaterialContext.Provider value={{
            materials, getMaterials, addMaterial
        }}>
            {props.children}
        </MaterialContext.Provider>
    )
}