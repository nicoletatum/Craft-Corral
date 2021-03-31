import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { userStorageKey } from "../auth/authSettings"
import { ProjectContext } from "./ProjectProvider"
import { MaterialContext } from "../Materials/MaterialProvider"
import { ProjectMaterialContext } from "../Materials/MaterialProjectProvider";
import { ToolContext } from "../Tools/ToolProvider"
import { ProjectToolContext } from "../Tools/ToolProjectProvider";
import { Multiselect } from 'multiselect-react-dropdown'
import "./ProjectBoard.css"
import { Form, Button, Jumbotron, Modal, Container } from "react-bootstrap";

export const CreateProject = () => {
    //allows us to access components through tree 
    const { addProject, getCategories, categories } = useContext(ProjectContext)
    const { getTools, tools, addTool } = useContext(ToolContext)
    const { getMaterials, materials, addMaterial } = useContext(MaterialContext)
    const { addProjectMaterial } = useContext(ProjectMaterialContext)
    const { addProjectTool } = useContext(ProjectToolContext)

    let currentUser = parseInt(sessionStorage.getItem(userStorageKey))
    const timestamp = new Date().toLocaleString()
    const history = useHistory();

        //data is stored, accessible, malleabele w/ state
    const [selectedMaterials, setSelectedMaterials] = useState([])
    const [selectedTools, setSelectedTools] = useState([])

    // creating object/storing data about project, tool, material
    const [project, setProject] = useState({
        "userId": currentUser,
        "name": "",
        "categoryId": 0,
        "description": "",
        "dateCreated": timestamp,
        "dateDue": ""
    })
    const [tool, setTool] = useState({
        "name": "",
        "userId": currentUser
    })
    const [material, setMaterial] = useState({
        "name": "",
        "userId": currentUser
    })

    //gives object w/methods on it. will routre back to url
    const handleControlledInputChange = (event) => {
        const newProject = { ...project }
        let selectedVal = event.target.value
        if (event.target.id.includes("id") || event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newProject[event.target.id] = selectedVal
        setProject(newProject)
    }
    const handleControlledInputTool = (event) => {
        const newTool = { ...tool }
        let selectedVal = event.target.value
        newTool[event.target.id] = selectedVal
        setTool(newTool)
    }
    const handleControlledInputMaterial = (event) => {
        const newMaterial = { ...material }
        let selectedVal = event.target.value
        newMaterial[event.target.id] = selectedVal
        setMaterial(newMaterial)
    }


    //"saves" tools/materials(selectedItem) temporarily in lil select box
    const handleMultiSelectTools = (selectedList, selectedItem) => {
        const newSelectedTools = selectedTools.slice()
        newSelectedTools.push(selectedItem)
        setSelectedTools(selectedList)
    }
    const handleMultiSelectMaterials = (selectedList, selectedItem) => {
        const newSelectedMaterials = selectedMaterials.slice()
        newSelectedMaterials.push(selectedItem)
        setSelectedMaterials(selectedList)
    }

//saves projects, materials/tools(jointable mess.. I mean.. fun!)
    const handleClickSaveProject = (event) => {
        event.preventDefault()
        addProject(project)
        .then(response => {
            selectedMaterials.map(material => {
            const newProjectMaterial = {
                projectId: response.id,
                materialId: material.id
            }
            addProjectMaterial(newProjectMaterial)
        })
        selectedTools.map(tool => {
            const newProjectTool = {
                projectId: response.id,
                toolId: tool.id
            }
            addProjectTool(newProjectTool)
        })
            history.push("/projects")
    })
    }

    //saves created tools/materials from modal. on save also closes modal
    const handleClickSaveTool = (event) => {
        event.preventDefault()
        addTool(tool)
        setShowTool(false);
    }
    const handleClickSaveMaterial = (event) => {
        event.preventDefault()
        addMaterial(material)
        setShowMaterial(false)
    }

    const [showTool, setShowTool] = useState(false);
    const handleCloseTool = () => setShowTool(false);
    const handleShowTool = () => setShowTool(true);

    const [showMaterial, setShowMaterial] = useState(false);
    const handleCloseMaterial = () => setShowMaterial(false);
    const handleShowMaterial = () => setShowMaterial(true);

    //renders materials, categories, tools
    //"lifecycle" of component. (helps run and get data for variable)
    useEffect(() => {
        getTools()
            .then(getMaterials())
            .then(getCategories())
    }, [])

    return (
        <>
        <Container className="projectContainer">
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
                        onSelect={handleMultiSelectTools} // Function will trigger on select event
                        onRemove={tools.onRemove} // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                        // className="MS"
                    />
                </Form.Group>
                <div className="cantFind">
                    <p className="cantFindText">Can't find tool?</p>
                    <Button onClick={handleShowTool} className="formButton btn-outline-dark">add tool</Button>
                    <Modal show={showTool} onHide={handleCloseTool}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Tool</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Control type="text" id="name" onChange={handleControlledInputTool}>
                                </Form.Control>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={handleClickSaveTool} className="formButton btn-outline-dark">
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Form.Group>
                    <Form.Label id="project.materials"> Materials needed: </Form.Label>
                    <Multiselect
                        options={materials}
                        selectedValues={materials.selectedValue}
                        onSelect={handleMultiSelectMaterials} 
                        onRemove={materials.onRemove} 
                        displayValue="name" 
                        // className="MS"
                    />

                </Form.Group>
                <div className="cantFind">
                    <p className="cantFindText"> Can't find material?</p>
                    <Button onClick={handleShowMaterial} className="formButton btn-outline-dark">add material</Button>
                    <Modal show={showMaterial} onHide={handleCloseMaterial}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Material</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Control type="text" id="name" onChange={handleControlledInputMaterial}>
                                </Form.Control>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClickSaveMaterial} className="formButton btn-outline-dark">
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Form.Group>
                    <Form.Label id="project.dateDue"> Date Due: </Form.Label>
                    <Form.Control type="datetime-local" id="dateDue" onChange={handleControlledInputChange} />
                </Form.Group>
                <Button onClick={handleClickSaveProject} className="formButton btn-outline-dark"> Save Project </Button>
            </Form>
            </Container>
        </>
    )
}