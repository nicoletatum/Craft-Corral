import { useState, createContext } from "react"

//context allows a way to pass data through components tree w/o having to pass props DOWN manually at every level
export const ProjectContext = createContext()

export const ProjectProvider = (props) => {

    //useState stores data about component
    const [projects, setProjects] = useState([])

    const [categories, setCategories] = useState([])

    const getProjects = () => {
        return fetch("http://localhost:8088/projects?_expand=category")
            .then(response => response.json())
            .then(setProjects)
    }
    const getProjectsByUserId = (userId) => {
        return fetch(`http://localhost:8088/projects?_expand=category&userId=${userId}`)
            .then(response => response.json())
            .then(setProjects)
    }

    const getProjectById = (projectId) => {
        return fetch(`http://localhost:8088/projects/${projectId}`)
            .then(res => res.json())
    }

    const addProject = projectObj => {
        return fetch("http://localhost:8088/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectObj)
        })
        .then(response => response.json())
            // .then(getProjects)
    }
    const editProject = project => {
        return fetch(`http://localhost:8088/projects/edit/${project.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then(getProjects)
    }

    const deleteProject = (projectId) => {
        return fetch(`http://localhost:8088/projects/${projectId}`, {
            method: "DELETE"
        })
            .then(getProjects)
    }

    const getCategories = () => {
        return fetch("http://localhost:8088/categories")
            .then(response => response.json())
            .then(setCategories)
    }

    //DONT FORGET TO COMMENT OUT WHAT THIS IS DOING????
    //can access items in children of "props" whatever
    return (
        <ProjectContext.Provider value={{
            projects, getProjects, getProjectsByUserId, addProject, getCategories, categories, deleteProject, getProjectById, editProject
        }}>
            {props.children}
        </ProjectContext.Provider>
    )
}

// http://localhost:8088/projectsMaterials?_expand=material&_expand=project

