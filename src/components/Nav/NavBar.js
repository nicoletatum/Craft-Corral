import React from "react"
import { Link } from "react-router-dom"
import { Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// import { authApi, userStorageKey } from "../auth/authSettings"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <>
            <div className="titleblock">
            <h1 className="title"> Crusty's Craft Corral </h1>
            <h3 className="subHead">wranglin' creative endeavors for forty years </h3>
            </div> 
            <Navbar>
                    {/* <NavBar.Brand  href="/"> Home </NavBar.Brand> */}
                    {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                <Nav className="mr-auto">
                    <Nav.Link  href="/projects">Projects</Nav.Link>
                    <Nav.Link  href="projects/addProject">Add Project</Nav.Link>
                    <Nav.Link  onClick={e => sessionStorage.clear()} to="/">Sign Out</Nav.Link>    
                </Nav>
            </Navbar>
        </>
    )
}

// sessionStorage.clear()