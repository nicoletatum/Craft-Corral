import { useContext, useEffect } from "react"
import { ProjectContext } from "./ProjectProvider.js"
import { ProjectCard } from "./Project.js"
import { userStorageKey } from "../auth/authSettings.js"


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
            <h3 className="projectHeader"> <p>projects</p> </h3>
            <div className="projects">
            {
                userProjects.map(project => {
                return <ProjectCard key={project.id}
                            project={project} /> 
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
console.log(ProjectCard)