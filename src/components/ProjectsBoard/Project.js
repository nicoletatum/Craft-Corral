import React, { useContext, useState } from "react"
// import "./Project.css"
import { ProjectContext } from "./ProjectProvider.js"
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { useHistory } from "react-router-dom"

export const ProjectCard = ({ project }) => {
    
    const { getProjects, deleteProject } = useContext(ProjectContext)

    const history = useHistory()

    const handleDelete = () => {
        deleteProject(project.id)
            .then(() => {
                history.push("/projects")
            })
    }  

    return (
            <Card className="ProjectCard">
            <Card.Title className="projectName">{project.name}</Card.Title>
            <div className="projectDescription">Description: {project.description}</div>
            <div className="projectcategory">Category: {project.category?.name}</div>
            <div className="projectCreationDate">Date Started: {project.dateCreated}</div>
            <div className="projectCompletionDate">Complete by: {project.dateDue}</div>
            <Container>
            <Button variant="light" size="sm" > edit </Button>
            <Button onClick={handleDelete} variant="light" size="sm"> delete </Button>
            </Container>
        </Card>
    )
}