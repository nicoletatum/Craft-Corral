//created by nicole 
import React from "react"
// import "./Project.css"
// import { ProjectContext } from "./ProjectProvider.js"
// import { useHistory } from "react-router-dom"

export const ProjectCard = ({ project }) => {

    // const history = useHistory();
    // const { getProjects } = useContext(ProjectContext)
    return (
            <section className="ProjectCard">
            <h3 className="projectName">{project.name}</h3>
            <div className="projectDescription">{project.description}</div>
            <div className="projectUser">{project.userId}</div>
            <div className="projectcategory">{project.categoryId}</div>
            <div className="projectCreationDate">{project.dateCreated}</div>
            <div className="projectCompletionDate">Complete by: {project.dueDate}</div>
            <button > edit </button>
        </section>
    )
}