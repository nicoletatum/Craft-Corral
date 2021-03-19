import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { ProjectContext } from "./ProjectProvider"
import { userStorageKey } from "../auth/authSettings"
import { Form, FormLabel, Button } from "react-bootstrap";

export const CreateProject = () => {
    let currentUser = parseInt(sessionStorage.getItem(userStorageKey))
    const history = useHistory();

    // const { addProject } = useContext(ProjectContext)


    const [project, setProject] = useState({
        name:"",
        category:"",
        description: "",
        userId: currentUser,
        categoryId: 0,
        dateCreated: "",
        dateDue: ""
    })
    const handleControlledInputChange = (event) => {
        const newProject = { ...project}
        let selectedVal = event.target.value
        if(event.target.id.includes("id")){
        selectedVal = parseInt(selectedVal)
        }
        newProject[event.target.id] = selectedVal
    }


    // useEffect(() => {
    //     getProjects()
    // }, [])

    // const

    return(
        <>
        <Form className="ProjectForm">
            <Form.Group>
                <Form.Label id="project.name"> Project Name: </Form.Label>
                <Form.Control type="text" placeholder="Enter name of project" />
            </Form.Group>
            <Form.Group>
                <Form.Label id="project.description"> Project Description: </Form.Label>
                <Form.Control type="text" placeholder="Tell Crusty a bit about your project" />
            </Form.Group>
            <Form.Group>
                <Form.Label id="project.categoryId"> Project Category: </Form.Label>
                <Form.Control type="text" placeholder="Select Category " />
            </Form.Group>
            <Form.Group>
                <Form.Label id="project.dateDue"> Date Due: </Form.Label>
                <Form.Control type="text" placeholder="datepicker? for bootstrap" />
            </Form.Group>
            <Button> edit </Button>
        </Form>
        </>
    )
}