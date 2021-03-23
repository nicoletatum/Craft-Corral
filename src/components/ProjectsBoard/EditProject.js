import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { ProjectContext } from "./ProjectProvider.js"
import { userStorageKey } from "../auth/authSettings.js"
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
// import "./Project.css"

export const ProjectEdit = () => {
    
    const { getProjects, addProject, getProjectById, deleteProject, editProject } = useContext(ProjectContext)
    //DO I NEED BELOW CODE
    let currentUser = parseInt(sessionStorage.getItem(userStorageKey))
    const timestamp = new Date().toLocaleString()
    const { projectId } = useParams()
    const history = useHistory()

    const [project, setProject] = useState({
        "userId": currentUser,
        "name": "",
        "categoryId": "",
        "description": "",
        "dateCreated": timestamp,
        "dateDue": ""
    })

    useEffect(() => {
        getProjects()
        if (projectId) {
            getProjectById(projectId)
            .then(project => {
                setProject(project)
            })
        }
    }, [])
    

    return (
            <Card className="ProjectEdit">
            <Card.Title className="projectName">{project.name}</Card.Title>
            <div className="projectDescription">Description: {project.description}</div>
            <div className="projectcategory">Category: {project.category?.name}</div>
            <div className="projectCreationDate">Date Started: {project.dateCreated}</div>
            <div className="projectCompletionDate">Complete by: {project.dateDue}</div>
            <Container>
            </Container>
        </Card>
    )
}