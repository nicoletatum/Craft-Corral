import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { ProjectContext } from "./ProjectProvider.js"
import { userStorageKey } from "../auth/authSettings.js"
import { ToolContext } from "../Tools/ToolProvider"
import { MaterialContext } from "../Materials/MaterialProvider"
import { Form, FormLabel, Button, Jumbotron, Modal } from "react-bootstrap";
import { Multiselect } from 'multiselect-react-dropdown'

// import "./Project.css"

export const ProjectEdit = () => {
    
    const { getProjects, addProject, getProjectById, deleteProject, editProject, categories, getCategories } = useContext(ProjectContext)
    const { getTools, tools } = useContext(ToolContext)
    const { getMaterials, materials } = useContext(MaterialContext)
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
    
    const [showTool, setShowTool] = useState(false);
    const handleCloseTool = () => setShowTool(false);
    const handleShowTool = () => setShowTool(true);


    const [showMaterial, setShowMaterial] = useState(false);
    const handleCloseMaterial = () => setShowMaterial(false);
    const handleShowMaterial = () => setShowMaterial(true);
    
    useEffect(() => {
        getProjects()
        if (projectId) {
            getProjectById(projectId)
            .then(getTools())
            .then(getMaterials())
            .then(getCategories())
            .then(project => {
                setProject(project)
            })
        }
    }, [])

    const handleControlledInputChange = (event) => {
        const newProject = { ...project }
            newProject[event.target.id] = event.target.value
            setProject(newProject)
    }
    
    const handleClickSaveProject = (event) => {
        event.preventDefault()

        addProject(project)
            .then(() => history.push("/projects"))
    }


    return (
        <>
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
                <Form.Label id="project.tools"> Tools needed: </Form.Label>
                <Multiselect
                    options={tools} // Options to display in the dropdown
                    selectedValues={tools.selectedValue} // Preselected value to persist in dropdown
                    onSelect={tools.onSelect} // Function will trigger on select event
                    onRemove={tools.onRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                />
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
                <Multiselect
                    options={materials} // Options to display in the dropdown
                    selectedValues={materials.selectedValue} // Preselected value to persist in dropdown
                    onSelect={materials.onSelect} // Function will trigger on select event
                    onRemove={materials.onRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                />
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
                <Form.Control type="datetime-local" />
            </Form.Group>
            <Button onClick={handleClickSaveProject}> Save Project </Button>
        </Form>
    </>
        //     <Card className="ProjectEditForm">
        //     <Card.Title className="projectName">{project.name}</Card.Title>
        //     <div className="projectDescription">Description: {project.description}</div>
        //     <div className="projectcategory">Category: {project.category?.name}</div>
        //     <div className="projectCreationDate">Date Started: {project.dateCreated}</div>
        //     <div className="projectCompletionDate">Complete by: {project.dateDue}</div>
        //     <Container>
        //     </Container>
        // </Card>
    )
}