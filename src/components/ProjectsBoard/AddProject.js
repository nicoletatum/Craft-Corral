import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { ProjectContext } from "./ProjectProvider"
import { userStorageKey } from "../auth/authSettings"
import { ToolContext } from "../Tools/ToolProvider"
import { MaterialContext } from "../Materials/MaterialProvider"
import { Form, Button, Jumbotron, Modal } from "react-bootstrap";
import { Multiselect } from 'multiselect-react-dropdown'
import "./ProjectBoard.css"
import { ProjectMaterialContext } from "../Materials/MaterialProjectProvider";
import { ProjectToolContext } from "../Tools/ToolProjectProvider";

export const CreateProject = () => {
    //allows us to access components through tree 
    const { addProject, getCategories, categories } = useContext(ProjectContext)
    const { getTools, tools, addTool } = useContext(ToolContext)
    const { getMaterials, materials, addMaterial } = useContext(MaterialContext)
    const { addProjectMaterial, projectsMaterials } = useContext(ProjectMaterialContext)
    const { addProjectTool, projectsTools } = useContext(ProjectToolContext)

    let currentUser = parseInt(sessionStorage.getItem(userStorageKey))
    const timestamp = new Date().toLocaleString()
    const history = useHistory();

    const [selectedMaterials, setSelectedMaterials] = useState([])
    const [selectedTools, setSelectedTools] = useState([])

    //storing data about project
    const [project, setProject] = useState({
        "userId": currentUser,
        "name": "",
        "categoryId": 0,
        "description": "",
        "dateCreated": timestamp,
        "dateDue": ""
    })

    const [projectsTool, setProjectTool] = useState({
        "projectId": 0,
        "toolId": 0
    })

    const [tool, setTool] = useState({
        "name": "",
        "userId": currentUser
    })

    const [projectsMaterial, setProjectMaterial] = useState({
        "projectId": 0,
        "materialId": 0
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

    const handleMultiSelectTools = (selectedList, selectedItem) => {
        const newSelectedTools = selectedTools.slice()
        newSelectedTools.push(selectedItem)
        setSelectedTools(selectedList)
        console.log(selectedTools, "selectedTools")
    }

    const handleMultiSelectMaterials = (selectedList, selectedItem) => {
        const newSelectedMaterials = selectedMaterials.slice()
        newSelectedMaterials.push(selectedItem)
        setSelectedMaterials(selectedList)
    }

    const handleClickSaveProject = (event) => {
        event.preventDefault()
        addProject(project)
        .then(response => {
            console.log("response", response)
            selectedMaterials.map(material => {
            const newProjectMaterial = {
                projectId: response.id,
                materialId: material.id
            }
            addProjectMaterial(newProjectMaterial)
        })
        console.log(selectedTools, "selectedTools in save")
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
                        onSelect={handleMultiSelectTools} // Function will trigger on select event
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
                                <Form.Control type="text" id="name" onChange={handleControlledInputTool}>
                                </Form.Control>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClickSaveTool}>
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
                        onSelect={handleMultiSelectMaterials} // Function will trigger on select event
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
                                <Form.Control type="text" id="name" onChange={handleControlledInputMaterial}>
                                </Form.Control>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClickSaveMaterial}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Form.Group>
                    <Form.Label id="project.dateDue"> Date Due: </Form.Label>
                    <Form.Control type="datetime-local" id="dateDue" onChange={handleControlledInputChange} />
                </Form.Group>
                <Button onClick={handleClickSaveProject}> Save Project </Button>
            </Form>
        </>
    )
}