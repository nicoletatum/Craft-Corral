import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home/Home"
import{ ProjectBoard } from "./ProjectsBoard/ProjectBoard"
import { ProjectProvider } from "./ProjectsBoard/ProjectProvider"
import { CreateProject } from "./ProjectsBoard/AddProject"
export const ApplicationViews = () => {
    return (
        <>
        {/* <p>test application views</p> */}
        <Route exact path="/">
                <Home />
        </Route>
        
        <ProjectProvider>
        <Route exact path="/projects">
                <ProjectBoard  />
        </Route>
        <Route path="/projects/addProject">
            <CreateProject />
        </Route>
        </ProjectProvider>
        </>
    )
}