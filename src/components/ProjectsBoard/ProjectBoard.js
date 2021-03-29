import { useContext, useEffect, useState } from "react"
import { ProjectContext } from "./ProjectProvider.js"
import { ProjectCard } from "./Project.js"
import { userStorageKey } from "../auth/authSettings.js"
import Button from 'react-bootstrap/Button';
import { CardDeck, Form, Jumbotron } from "react-bootstrap";
// import "./ProjectBoard.css"

export const ProjectBoard = () => {
    const { projects, getProjects, getProjectsByUserId, getCategories, categories} = useContext(ProjectContext)
    const [filteredProjects, setFilteredProjects] = useState([])
    let currentUser = parseInt(sessionStorage.getItem(userStorageKey))

    useEffect(() => {
        getProjectsByUserId(currentUser)
        .then(getCategories)
    }, [])

    useEffect(() => {
        setFilteredProjects(projects)
    }, [projects])

    const handleFilterProjects = (event) => {
        debugger
        let selectedVal = event.target.value
        if (selectedVal !== "0") {
            let filteredProj = projects.filter(project => {
                return project.categoryId === parseInt(selectedVal)
            })
            setFilteredProjects(filteredProj)
        } else {
            setFilteredProjects(projects)
        }
    }

    return (
        <>
        {console.log(filteredProjects, "fp")}
            <Jumbotron className="projectsTitle"> <h3>projects</h3> </Jumbotron>
            <div className="sortButtons">
                <p>Sort projects by category: </p>
                <Form.Control as="select" custom id="categoryId" value={filteredProjects.id} name="categoryId" onChange={handleFilterProjects}>
                    <option value="0">Select a Category</option>
                    {
                        categories.map(selectCategory => <option value={selectCategory.id} key={selectCategory.id}>{selectCategory.name}</option>)
                    }
                </Form.Control>
                {/* <Button>Date Created(date due?)</Button> */}
            </div>
            <CardDeck>
                {
                    filteredProjects.map(project => {
                        return <ProjectCard key={project.id}
                                            project={project} />
                    })
                }
            </CardDeck>
        </>
    )
}
