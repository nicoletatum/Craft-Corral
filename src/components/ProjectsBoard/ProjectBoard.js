import { useContext, useEffect } from "react"
import { ProjectContext } from "./ProjectProvider.js"
import { ProjectCard } from "./Project.js"
// import { useHistory } from "react-router"
// import "./Project.css"
// import { useHistory } from "react-router-dom"

export const ProjectBoard = () => {
    const { projects, getProjects } = useContext(ProjectContext)

    let currentUser = parseInt(sessionStorage.getItem("app_user_id"))
    useEffect(() => {
        getProjects()
    }, [])

    let userProjects = projects.filter(project => currentUser === project.userId)
    // const history = useHistory()

    return (
        <>
            <h3 className="projectHeader"> <p>projects</p> </h3>
            <div className="projects">
            {userProjects.map(project => {
                return <ProjectCard /> 
                })
            }
            </div>
            <div className="projectButtonDiv">
                <button className="addProjectButton">
                    Add Project
            </button>
            </div>
        </>
    )
}