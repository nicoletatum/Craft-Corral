//created by nicole 
import React, { useContext, useState } from "react"
// import "./Project.css"
import { ProjectContext } from "./ProjectProvider.js"

export const ProjectCard = ({ project }) => {
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