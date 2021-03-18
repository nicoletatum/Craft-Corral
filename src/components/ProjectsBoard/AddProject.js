import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { ProjectContext } from "./ProjectProvider"

export const CreateProject = () => {

    const { addProject } = useContext(ProjectContext)

    const [project, setProject] = useState({
        name:"",
        category:"",
        description: "",
        userId: 0,
        categoryId: 0,
        dateCreated: "",
        dateDue: ""
    })

    const history = useHistory();

    // useEffect(() => {
    //     getProjects()
    // }, [])

    // const

    return(
        <form className="ProjectCard">
            <h3 className="projectName">{project.name}</h3>
            <div className="projectDescription">{project.description}</div>
            <div className="projectUser">{project.userId}</div>
            <div className="projectcategory">{project.categoryId}</div>
            <div className="projectCreationDate">{project.dateCreated}</div>
            <div className="projectCompletionDate">Complete by: {project.dueDate}</div>
            <button > edit </button>
        </form>
    )
}