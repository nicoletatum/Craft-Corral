import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home/Home"
import { ProjectBoard } from "./ProjectsBoard/ProjectBoard"
import { ProjectProvider } from "./ProjectsBoard/ProjectProvider"
import { CreateProject } from "./ProjectsBoard/AddProject"
import { ProjectEdit } from "./ProjectsBoard/EditProject"
import { ToolProvider } from "./Tools/ToolProvider"
import { MaterialProvider } from "./Materials/MaterialProvider"
export const ApplicationViews = () => {
    return (
        <>
            {/* <p>test application views</p> */}
            <Route exact path="/">
                <Home />
            </Route>
            <ProjectProvider>
                <ToolProvider>
                    <MaterialProvider>
                        <Route exact path="/projects">
                            <ProjectBoard />
                        </Route>
                        <Route path="/addProject">
                            <CreateProject />
                        </Route>
                        <Route path="/projects/edit/:projectId(\d+)">
                            <ProjectEdit />
                        </Route>
                    </MaterialProvider>
                </ToolProvider>
            </ProjectProvider>
        </>
    )
}