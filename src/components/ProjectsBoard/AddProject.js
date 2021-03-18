import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { ProjectContext } from "./ProjectProvider"
import { userStorageKey } from "../auth/authSettings"

export const CreateProject = () => {
    let currentUser = parseInt(sessionStorage.getItem(userStorageKey))
    const history = useHistory();

    // const { addProject } = useContext(ProjectContext)


    const [project, setProject] = useState({
        name:"",
        category:"",
        description: "",
        userId: currentUser,
        categoryId: 0,
        dateCreated: "",
        dateDue: ""
    })
    const handleControlledInputChange = (event) => {
        const newProject = { ...project}
        let selectedVal = event.target.value
        if(event.target.id.includes("id")){
        selectedVal = parseInt(selectedVal)
        }
        newProject[event.target.id] = selectedVal
    }


    // useEffect(() => {
    //     getProjects()
    // }, [])

    // const

    return(
        <>
        <form className="ProjectCard">
            <h3 id="projectName">{project.name}</h3>
            <div className="projectDescription">{project.description}</div>
            <div className="projectUser">{project.userId}</div>
            <div className="projectcategory">{project.categoryId}</div>
            <div className="projectCreationDate">{project.dateCreated}</div>
            <div className="projectCompletionDate">Complete by: {project.dueDate}</div>
            <button > edit </button>
        </form>
        </>
    )
}