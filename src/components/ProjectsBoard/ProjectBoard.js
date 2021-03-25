import { useContext, useEffect, useState } from "react"
import { ProjectContext } from "./ProjectProvider.js"
import { ProjectCard } from "./Project.js"
import { userStorageKey } from "../auth/authSettings.js"
import Button from 'react-bootstrap/Button';
import { CardDeck, Form, Jumbotron } from "react-bootstrap";
import "./ProjectBoard.css"

export const ProjectBoard = () => {
    const { projects, getProjects, getProjectsByUserId, getCategories, categories } = useContext(ProjectContext)
    const [filteredProjects, setFilteredProjects] = useState([])


    let currentUser = parseInt(sessionStorage.getItem(userStorageKey))

    useEffect(() => {
        getProjectsByUserId(currentUser)
        // .then(setFilteredProjects(projects))
        .then(getCategories)
        }, [])
        
        useEffect(() => {
            console.log("filterdProjects", filteredProjects)
            setFilteredProjects(projects)
            }, [projects])

        // console.log("projects",projects)
    // filters through projects to only return those with matching userId
    // let userProjects = projects.filter(project => currentUser === project.userId)

    const handleFilterProjects = (event) => {
        let selectedVal = +event.target.value
        if (event.target.id !== "0") {
            let filteredProj = filteredProjects.filter(project => {
                return project.categoryId === parseInt(selectedVal)
            })
            setFilteredProjects(filteredProj)
        } else {
            setFilteredProjects(projects)
        }
    }  


    return (
        <>
            <Jumbotron className="projectsTitle"> <h3>projects</h3> </Jumbotron>
            <div className="sortButtons">
                <p>Sort projects by category: </p>
                <Form.Control as="select" custom id="categoryId" onChange={handleFilterProjects}>
                    <option value="0">Select a Category</option>
                    {
                        categories.map(selectCategory => <option value={selectCategory.id}>{selectCategory.name}</option>)
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