import React, { useContext, useState } from "react"
// import "./Project.css"
import { ProjectContext } from "./ProjectProvider.js"
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

export const ProjectCard = ({ project }) => {
    return (
            <Card className="ProjectCard">
            <Card.Title className="projectName">{project.name}</Card.Title>
            <div className="projectDescription">Description: {project.description}</div>
            <div className="projectcategory">Category: {project.category.name}</div>
            <div className="projectCreationDate">Date Started: {project.dateCreated}</div>
            <div className="projectCompletionDate">Complete by: {project.dateDue}</div>
            <Container>
            <Button variant="light" size="sm" > edit </Button>
            <Button variant="light" size="sm"> delete </Button>
            </Container>
        </Card>
    )
}