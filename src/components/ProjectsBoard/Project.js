import React, { useContext, useState, useEffect } from "react"
import { ProjectContext } from "./ProjectProvider.js"
import{ ProjectMaterialContext } from "../Materials/MaterialProjectProvider"
import { MaterialContext } from "../Materials/MaterialProvider"
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { useHistory } from "react-router-dom"
// import "./Project.css"

export const ProjectCard = ({ project, projectMaterial }) => {
    
    const { deleteProject, editProject, getProjects } = useContext(ProjectContext)
    const { getProjectsMaterials, projectsMaterials } = useContext(ProjectMaterialContext)
    const { materials, getMaterials } = useContext(MaterialContext)

    //gives an object with methods on it. then goes back "through history" to new url
    const history = useHistory()

    const handleDelete = () => {
        deleteProject(project.id)
            .then(() => {
                history.push("/projects")
            })
    }  

    const handleEdit = () => {
        editProject(project.id)
        .then(() => {
            history.push(`/projects/edit/${project.id}`)
        })
    }

    useEffect(() => {
        getProjects()
        .then(getProjectsMaterials())
        .then(getMaterials())
    }, [])
    
        // map through projmaterials to find material(single object) CONTINUE 
    // let matchingProjMat = projectsMaterials.map(material => {
    //     materials.find(materialname => {
    //         return materialname.id === material.id   
    //     })
    // })
    // let matchingProjMat = projectMaterial.map(material => {
    //     materials.find(materialName => {
    //         return materialName.id === material.id
    //     })
    // }

    // )

    // let userProjects = projects.filter(project => currentUser === project.userId)

    return (
        <Card className="ProjectCard">
                {console.log("pm", materials)}
            <Card.Title className="projectName">{project.name}</Card.Title>
            <div className="projectDescription">Description: {project.description}</div>
            <div className="projectcategory">Category: {project.category?.name}</div>
            {/* <div className="projectTools">Tools Needed: </div> */}
            <div className="projectsMaterials">Materials Needed: 
            {
                    let matchingProjectMaterialsName = projectsMaterials.map(material => {
                })
            }
            </div>
            <div className="projectCreationDate">Date Started: {project.dateCreated}</div>
            <div className="projectCompletionDate">Complete by: {project.dateDue}</div>
            <Container>
            <Button onClick={handleEdit} variant="light" size="sm" > edit </Button>
            <Button onClick={handleDelete} variant="light" size="sm"> delete </Button>
            </Container>
        </Card>
    )
}