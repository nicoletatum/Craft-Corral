import { useContext, useEffect, useState } from "react"
import { ProjectContext } from "./ProjectProvider.js"
import { ProjectCard } from "./Project.js"
import { userStorageKey } from "../auth/authSettings.js"
import Button from 'react-bootstrap/Button';
import { CardDeck, Form, Jumbotron } from "react-bootstrap";
import "./ProjectBoard.css"

export const ProjectBoard = () => {
    const { projects, getProjects, getCategories, categories } = useContext(ProjectContext)
    // const [filteredProjects, setFilteredProjects] = useState([])


    let currentUser = parseInt(sessionStorage.getItem(userStorageKey))


    useEffect(() => {
        getProjects()
            .then(getCategories())
    }, [])

    // filters through projects to only return those with matching userId
    let userProjects = projects.filter(project => currentUser === project.userId)

    const handleFilterProjects = (event) => {
        let selectedVal = event.target.value
        if (event.target.id !== "0") {
            projects.filter(project => {
                return project.classId === parseInt(selectedVal)
            })
            {console.log(selectedVal)}
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
                    userProjects.map(project => {
                        // console.log("material", materials)
                        return <ProjectCard key={project.id}
                            project={project} />
                    })
                }
            </CardDeck>
        </>
    )
}