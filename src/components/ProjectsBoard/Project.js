//created by nicole 
import React, { useContext, useState } from "react"
// import "./Project.css"
import { ProjectContext } from "./ProjectProvider.js"

export const ProjectCard = ({ project }) => {
    return (
            <section className="ProjectCard">
            <h3 className="projectName">{project.name}</h3>
            <div className="projectDescription">Description: {project.description}</div>
            {/* <div className="projectUser">{project.user.name}</div> */}
            <div className="projectcategory">Category: {project.category.name}</div>
            <div className="projectCreationDate">Date Started: {project.dateCreated}</div>
            <div className="projectCompletionDate">Complete by: {project.dateDue}</div>
            <button > edit </button>
            <button > delete </button>
        </section>
    )
}