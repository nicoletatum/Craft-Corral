import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ProjectContext } from "./ProjectProvider.js"
import{ ProjectMaterialContext } from "../Materials/MaterialProjectProvider"
import { ProjectToolContext } from "../Tools/ToolProjectProvider.js"
import {Button, Card, Container} from 'react-bootstrap'
import "./ProjectBoard.css"

export const ProjectCard = ({ project }) => {
    
    //creates a global state for data passing through components(allows me to access data)
    const { deleteProject } = useContext(ProjectContext)
    const { getProjectsMaterials, projectsMaterials } = useContext(ProjectMaterialContext)
    const { getProjectsTools, projectsTools } = useContext(ProjectToolContext)

    //gives an object with methods on it. then goes back "through history" to new url
    const history = useHistory()
    const handleDelete = () => {
        deleteProject(project.id)
            .then(() => {
                history.push("/projects")
            })
    }  

    //renders tools and materials for projects 
    useEffect(() => {
        getProjectsMaterials()
        .then(getProjectsTools)
    }, [])
    
    return (
        <Card className="ProjectCard">
            <Card.Title className="projectName"><strong>{project.name}</strong></Card.Title>
            <div className="projectDescription"><b>Description: </b>{project.description}</div>
            <div className="projectcategory"><b>Category: </b>{project.category?.name}</div>
            <div className="projectTools">
                <b>Tools Needed: </b>
            { 
                    projectsTools.map(pt => {
                        if (pt.projectId === project.id) 
                        return <div key={pt.id} className="TN">{pt.tool.name}</div>}
                        )
            }
            </div>
            <div className="projectsMaterials">
                <b>Materials Needed: </b>
            { 
                    projectsMaterials.map(pm => {
                        if (pm.projectId === project.id) 
                        return <div key={pm.id} className="PN"> {pm.material.name} </div>}
                        )
            }
            </div>
            <div className="projectCreationDate"> <b>Date Started:</b> {project.dateCreated}</div>
            <div className="projectCompletionDate"><b>Complete by:</b> {project.dateDue}</div>
            <Container className="edButtons">
            <Button onClick={() => {
                history.push(`/projects/edit/${project.id}`)
                }}
                variant="light" size="sm" > edit </Button>
            <Button onClick={handleDelete} variant="light" size="sm"> delete </Button>
            </Container>
        </Card>
    )
}