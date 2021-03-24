import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { ProjectContext } from "./ProjectProvider"
import { userStorageKey } from "../auth/authSettings"
import { ToolContext } from "../Tools/ToolProvider"
import { MaterialContext } from "../Materials/MaterialProvider"
import { Form, FormLabel, Button, Jumbotron, Modal } from "react-bootstrap";
import { Multiselect } from 'multiselect-react-dropdown'
import "./ProjectBoard.css"
import { ProjectMaterialContext } from "../Materials/MaterialProjectProvider";

export const CreateProject = () => {
    //allows us to access components through tree 
    const { addProject, getCategories, categories } = useContext(ProjectContext)
    const { getTools, tools } = useContext(ToolContext)
    const { getMaterials, materials } = useContext(MaterialContext)
    const { addProjectMaterial } = useContext(ProjectMaterialContext)

    let currentUser = parseInt(sessionStorage.getItem(userStorageKey))
    const timestamp = new Date().toLocaleString()

    //storing data about project
    const [project, setProject] = useState({
        "userId": currentUser,
        "name": "",
        "categoryId": 0,
        "description": "",
        "dateCreated": timestamp,
        "dateDue": ""
    })
    //store projmat data
    const [projectMaterial, setProjectMaterial] = useState({
        "projectId": 0,
        "materialId": 0
    })
    //gives objecct w/methods on it. will routre back to url
    const history = useHistory();

//ASK FOR CLARIFICATION
    //new project is created. ...is used to grab whole object and not have to go through and add each ?child? ?value?
    //then value is added to new project if ?id is added?
    //then newProject is added using setProject 'form'
    const handleControlledInputChange = (event) => {
        const newProject = { ...project }
        let selectedVal = event.target.value
        if (event.target.id.includes("id")) {
            selectedVal = parseInt(selectedVal)
        }
        newProject[event.target.id] = selectedVal
        setProject(newProject)
    }

//ASK WHY PREVENT DEFAULT
    //project object is pushed to projects array using addProject function
    const handleClickSaveProject = (event) => {
        event.preventDefault()
        addProject(project)
            .then(() => history.push("/projects"))
    }

    const handleControlledInputChangeProjectMaterial = (event) => {
        const newProjectMaterial = { ...projectMaterial }
        let selectedVal = event.target.value
        if (event.target.id.includes("id")) {
            selectedVal = parseInt(selectedVal)
        }
        newProjectMaterial[event.target.id] = selectedVal
        setProjectMaterial(newProjectMaterial)
    }


    // const handleMultiSelect = (selectedList,selectedItem ) => {
    //     const newSelectedEmployees = selectedEmployees.slice()
    //     newSelectedEmployees.push(selectedItem)
    //     setSelectedEmployees(newSelectedEmployees)
    // }

    const handleClickSaveProjectMaterial = (event) => {
        event.preventDefault()
        addProjectMaterial(projectMaterial)
    }

    const [showTool, setShowTool] = useState(false);
    const handleCloseTool = () => setShowTool(false);
    const handleShowTool = () => setShowTool(true);


    const [showMaterial, setShowMaterial] = useState(false);
    const handleCloseMaterial = () => setShowMaterial(false);
    const handleShowMaterial = () => setShowMaterial(true);

    //"lifecycle" of component. (helps run and get data for variable)
    useEffect(() => {
        getTools()
            .then(getMaterials())
            .then(getCategories())
    }, [])

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
                    <Form.Control as="select" custom id="categoryId" onChange={handleControlledInputChange}>
                        <option value="0">Select a Category</option>
                        {
                            categories.map(category => <option value={category.id}>{category.name}</option>)
                        }
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label id="project.description"> Project Description: </Form.Label>
                    <Form.Control type="text" id="description" onChange={handleControlledInputChange} />
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
                    <Form.Label id="materials"> Materials needed: </Form.Label>
                    <Multiselect
                        options={materials} // Options to display in the dropdown
                        selectedValues={materials.selectedValue} // Preselected value to persist in dropdown
                        onSelect={handleControlledInputChangeProjectMaterial} // Function will trigger on select event
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
                    <Form.Control type="datetime-local" id="dateDue" onChange={handleControlledInputChange}/>
                </Form.Group>
                <Button onClick={handleClickSaveProject, handleClickSaveProjectMaterial}> Save Project </Button>
            </Form>
        </>
    )
}