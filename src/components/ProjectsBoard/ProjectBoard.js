import { useContext, useEffect } from "react"
import { ProjectContext } from "./ProjectProvider.js"
import { ProjectCard } from "./Project.js"
import { userStorageKey } from "../auth/authSettings.js"
import Button from 'react-bootstrap/Button';
import { CardDeck, Jumbotron } from "react-bootstrap";
import "./ProjectBoard.css"

export const ProjectBoard = () => {
    const { projects, getProjects } = useContext(ProjectContext)

    let currentUser = parseInt(sessionStorage.getItem(userStorageKey))
    
    useEffect(() => {
        getProjects()
    }, [])
    
    // debugger 
    let userProjects = projects.filter(project => currentUser === project.userId)
    // const history = useHistory()

    return (
        <>
            <Jumbotron className="projectsTitle"> <h3>projects</h3> </Jumbotron>
            <div className="sortButtons">
                <p>Sort projects by: </p>
            <Button>Category</Button>
            <Button>Date Created(date due?)</Button>
            </div>
        <CardDeck>
            {
                userProjects.map(project => {
                    return <ProjectCard key={project.id}
                    project={project} /> 
                })
            }
            </CardDeck>
        </>
    )
}
console.log(ProjectCard)
