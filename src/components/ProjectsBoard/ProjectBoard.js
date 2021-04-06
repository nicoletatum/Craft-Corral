import { useContext, useEffect, useState } from "react"
import { ProjectContext } from "./ProjectProvider.js"
import { ProjectCard } from "./Project.js"
import { userStorageKey } from "../auth/authSettings.js"
import { CardDeck, Form, Jumbotron, Container } from "react-bootstrap";
// import "./ProjectBoard.css"

export const ProjectBoard = () => {
    const { projects, getProjectsByUserId, getCategories, categories } = useContext(ProjectContext)
    const [filteredProjects, setFilteredProjects] = useState([])
    let currentUser = parseInt(sessionStorage.getItem(userStorageKey))

    //renders projects and categories 
    useEffect(() => {
        getProjectsByUserId(currentUser)
            .then(getCategories)
    }, [])

    //renders projects sorted by category dropdown. only when projects changes (see handlefilterprojects for what that change is)
    useEffect(() => {
        setFilteredProjects(projects)
    }, [projects])

    //on event, SFP is set to projects with catId===cat.id selected
    const handleFilterProjects = (event) => {
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
            <Container>
                <Jumbotron className="projectsTitle"> <h3>projects</h3> </Jumbotron>
                <div className="sortButtons">
                    <p>Sort projects by category: </p>
                    <Form.Control as="select" custom id="categoryId" value={filteredProjects.id} name="categoryId" onChange={handleFilterProjects}>
                        <option value="0">Select a Category</option>
                        {
                            categories.map(selectCategory => <option value={selectCategory.id} key={selectCategory.id}>{selectCategory.name}</option>)
                        }
                    </Form.Control>
                </div>
                <CardDeck className="projectCards">
                    {
                        filteredProjects.map(project => {
                            return <ProjectCard key={project.id}
                                project={project} />
                        })
                    }
                </CardDeck>
            </Container>
        </>
    )
}
