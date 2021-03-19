import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { ProjectContext } from "./ProjectProvider"
import { userStorageKey } from "../auth/authSettings"
import { Form, FormLabel, Button, Jumbotron, Modal } from "react-bootstrap";
import "./ProjectBoard.css"

export const CreateProject = () => {
    const { addProject } = useContext(ProjectContext)

    let currentUser = parseInt(sessionStorage.getItem(userStorageKey))
    const timestamp = new Date().toLocaleString()

    const [project, setProject] = useState({
        "name": "",
        "categoryId": "",
        "description": "",
        "userId": currentUser,
        "categoryId": 0,
        "dateCreated": timestamp,
        "dateDue": ""
    })

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newProject = { ...project }
        let selectedVal = event.target.value
        if (event.target.id.includes("id")) {
            selectedVal = parseInt(selectedVal)
        }
        newProject[event.target.id] = selectedVal
        setProject(newProject)
    }

    const handleClickSaveProject = (event) => {
        event.preventDefault()
        addProject(project)
            .then(() => history.push("/projects"))

    }
    const [showTool, setShowTool] = useState(false);
    const handleCloseTool = () => setShowTool(false);
    const handleShowTool = () => setShowTool(true);


    const [showMaterial, setShowMaterial] = useState(false);
    const handleCloseMaterial = () => setShowMaterial(false);
    const handleShowMaterial = () => setShowMaterial(true);
    // useEffect(() => {
    //     getProjects()
    // }, [])

    // const

    return (
        <>
            <Jumbotron className="projectsTitle"> <h3>Project Form</h3> </Jumbotron>
            <Form className="projectForm">
                <Form.Group>
                    <Form.Label id="project.name"> Project Name: </Form.Label>
                    <Form.Control type="text" id="name" onChange={handleControlledInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label id="project.categoryId"> Project Category: </Form.Label>
                    <Form.Control as="select" custom id="category" onChange={handleControlledInputChange}>
                        <option></option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label id="project.description"> Project Description: </Form.Label>
                    <Form.Control type="text" id="description" onChange={handleControlledInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label id="project.tools"> Tools needed: </Form.Label>
                    <Form.Control as="select" custom id="projectTools">
                        <option></option>
                    </Form.Control>
                </Form.Group>
                <div className="cantFind">
                    <p className="cantFindText">Can't find tool?</p>
                    <Button onClick={handleShowTool}>add tool</Button>
                    <Modal show={showTool} onHide={handleCloseTool}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Tool</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Control>
                                </Form.Control>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleCloseTool}>
                                Save 
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Form.Group>
                    <Form.Label id="project.materials"> Materials needed: </Form.Label>
                    <Form.Control as="select" custom>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                    </Form.Control>
                </Form.Group>
                <div className="cantFind">
                    <p className="cantFindText"> Can't find material?</p>
                    <Button onClick={handleShowMaterial}>add material</Button>
                    <Modal show={showMaterial} onHide={handleCloseMaterial}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Material</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Control>
                                </Form.Control>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleCloseMaterial}>
                                Save 
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Form.Group>
                    <Form.Label id="project.dateDue"> Date Due: </Form.Label>
                    <Form.Control type="text" placeholder="datepicker? for bootstrap" />
                </Form.Group>
                <Button> Save Project </Button>
            </Form>
        </>
    )
}