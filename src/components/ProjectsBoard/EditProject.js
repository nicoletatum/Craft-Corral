import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { userStorageKey } from "../auth/authSettings.js"
import { ProjectContext } from "./ProjectProvider.js"
import "./ProjectBoard.css"
import { Form, FormLabel, Container, Button, Jumbotron, Modal } from "react-bootstrap";

export const ProjectEdit = () => {

    const { getProjectsByUserId, addProject, editProject, getProjectById, categories, getCategories } = useContext(ProjectContext)

    const timestamp = new Date().toLocaleString()
    const { projectId } = useParams()
    const history = useHistory()

    let currentUser = parseInt(sessionStorage.getItem(userStorageKey))

    const [project, setProject] = useState({
        "userId": currentUser,
        "name": "",
        "categoryId": 0,
        "description": "",
        "dateCreated": timestamp,
        "dateDue": ""
    })

    const handleControlledInputChange = (event) => {
        const newProject = { ...project }
        newProject[event.target.id] = event.target.value
        setProject(newProject)
    }

    const handleClickUpdateProject = (event) => {
        event.preventDefault()
        editProject(project)
            .then(history.push("/projects"))
    }

    useEffect(() => {
        getProjectsByUserId()
        if (projectId) {
            getProjectById(projectId)
                .then(project => {
                    let editProject = {
                        "id": project.id,
                        "userId": project.userId,
                        "name": project.name,
                        "categoryId": project.categoryId,
                        "description": project.description,
                        "dateCreated": project.dateCreated,
                        "dateDue": project.dateDue
                    }
                    setProject(editProject)
                })
        }
    }, [])

    useEffect(() => {
            getCategories()
    }, [])


    return (
        <>
            <Container className="projectContainer">
                <Jumbotron className="projectsTitle"> <h3>Editing Project</h3> </Jumbotron>
                <Form className="projectForm">
                    <Form.Group>
                        <Form.Label id="project.name"> Project Name: </Form.Label>
                        <Form.Control type="text" id="name" value={project.name} onChange={handleControlledInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label id="project.categoryId"> Project Category: </Form.Label>
                        <Form.Control as="select" custom id="categoryId" value={project.categoryId} onChange={handleControlledInputChange}>
                            <option value="0">Select a Category</option>
                            {
                                categories.map(category => <option value={category.id}>{category.name}</option>)
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label id="project.description"> Project Description: </Form.Label>
                        <Form.Control type="text" id="description" value={project.description} onChange={handleControlledInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label id="project.dateDue"> Date Due: </Form.Label>
                        <Form.Control type="datetime-local" value={project.dateDue} />
                    </Form.Group>
                    <Button onClick={handleClickUpdateProject} className="button"> Update Project </Button>
                </Form>
            </Container>
        </>
    )
}