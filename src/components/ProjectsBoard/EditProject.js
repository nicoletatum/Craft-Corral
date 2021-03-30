import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { userStorageKey } from "../auth/authSettings.js"
import { ProjectContext } from "./ProjectProvider.js"
import { ProjectMaterialContext } from "../Materials/MaterialProjectProvider";
import { ProjectToolContext } from "../Tools/ToolProjectProvider";
import { MaterialContext } from "../Materials/MaterialProvider"
import { ToolContext } from "../Tools/ToolProvider"
import { Multiselect } from 'multiselect-react-dropdown'
import "./ProjectBoard.css"
import { Form, FormLabel, Container, Button, Jumbotron, Modal } from "react-bootstrap";

export const ProjectEdit = () => {

    const { getProjectsByUserId, addProject, editProject, getProjectById, categories, getCategories } = useContext(ProjectContext)
    const { getTools, addTool, tools } = useContext(ToolContext)
    const { getMaterials, addMaterial, materials } = useContext(MaterialContext)
    const { addProjectMaterial, projectsMaterials, editProjectMaterial } = useContext(ProjectMaterialContext)
    const { addProjectTool, projectsTools, getProjectsTools, editProjectTool } = useContext(ProjectToolContext)

    const timestamp = new Date().toLocaleString()
    const { projectId } = useParams()
    const history = useHistory()

    const [selectedMaterials, setSelectedMaterials] = useState([])
    const [selectedTools, setSelectedTools] = useState([])

    let currentUser = parseInt(sessionStorage.getItem(userStorageKey))

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
    const [material, setMaterial] = useState({
        "name": "",
        "userId": currentUser
    })
    const [projectsMaterial, setProjectMaterial] = useState({
        "projectId": 0,
        "materialId": 0
    })


    const handleControlledInputChange = (event) => {
        const newProject = { ...project }
        newProject[event.target.id] = event.target.value
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

    const handleClickUpdateProject = (event) => {
        console.log("test")
        event.preventDefault()
        editProject(project)
            .then(history.push("/projects"))
    }

    const handleMultiSelectTools = (selectedList, selectedItem) => {
        const newSelectedTools = selectedTools.slice()
        newSelectedTools.push(selectedItem)
        setSelectedTools(selectedList)
    }
    const handleMultiSelectRemoveTools = (selectedList, removedItem) => {
        const newSelectedTools = selectedTools.slice()
        // newSelectedTools.push(selectedItem)
        const tools = newSelectedTools.filter(tool => tool.id != removedItem.id)
        setSelectedTools(tools)
    }

    const handleMultiSelectMaterials = (selectedList, selectedItem) => {
        const newSelectedMaterials = selectedMaterials.slice()
        newSelectedMaterials.push(selectedItem)
        setSelectedMaterials(selectedList)
    }
    const handleMultiSelectRemoveMaterials = (selectedList, removedItem) => {
        const newSelectedMaterials = selectedMaterials.slice()
        // newSelectedTools.push(selectedItem)
        const materials = newSelectedMaterials.filter(material => material.id != removedItem.id)
        setSelectedMaterials(materials)
    }



    //relates to modal
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

    //relates to modal
    const [showTool, setShowTool] = useState(false);
    const handleCloseTool = () => setShowTool(false);
    const handleShowTool = () => setShowTool(true);
    const [showMaterial, setShowMaterial] = useState(false);
    const handleCloseMaterial = () => setShowMaterial(false);
    const handleShowMaterial = () => setShowMaterial(true);

    useEffect(() => {
        getProjectsByUserId()
            .then(getProjectsTools())
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
        getTools()
            .then(getMaterials())
            .then(getCategories())

    }, [])



    // let selectedTool = () => { 
    //     projectsTools.map(pt => {
    //     if (pt.projectId === project.id) 
    //     ST = pt.tool.name }
    //     )}



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
                        <Form.Label id="project.tools"> Tools needed: </Form.Label>
                        <Multiselect
                            options={tools} // Options to display in the dropdown
                            selectedValues={tools.name} // Preselected value to persist in dropdown
                            onSelect={handleMultiSelectTools} // Function will trigger on select event
                            onRemove={handleMultiSelectRemoveTools} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                        />
                    </Form.Group>
                    <div className="cantFind">
                        <p className="cantFindText">Can't find tool?</p>
                        <Button onClick={handleShowTool} className="button">add tool</Button>
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
                            options={materials}
                            // value= {
                            //     projectsMaterials.map(pm => {
                            //         if (pm.projectId === project.id) 
                            //         return {pm.material.name}}
                            //         )
                            // }
                            selectedValues={materials.selectedValue} // Preselected value to persist in dropdown
                            onSelect={handleMultiSelectMaterials} // Function will trigger on select event
                            onRemove={handleMultiSelectRemoveMaterials} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                        />
                    </Form.Group>
                    <div className="cantFind">
                        <p className="cantFindText"> Can't find material?</p>
                        <Button onClick={handleShowMaterial} className="button">add material</Button>
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
                        <Form.Control type="datetime-local" value={project.dateDue} />
                    </Form.Group>
                    <Button onClick={handleClickUpdateProject} className="button"> Update Project </Button>
                </Form>
            </Container>
            {console.log(projectsTools, "pt")}
        </>
    )
}