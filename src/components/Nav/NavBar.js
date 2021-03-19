import React from "react"
import { Link } from "react-router-dom"
import { Navbar, Nav, Jumbotron } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// import { authApi, userStorageKey } from "../auth/authSettings"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <>
        <Jumbotron className="headBlock">
            <div className="titleblock">
            <h1 className="title"> Crusty's Craft Corral </h1>
            <h3 className="subHead">wranglin' creative endeavors for forty years </h3>
            </div> 

            <Navbar className="navBar">
                <Nav>
                    <Nav.Link  href="/"> Home </Nav.Link> 
                    <Nav.Link  href="/projects">Projects</Nav.Link>
                    <Nav.Link  href="/addProject">Add Project</Nav.Link>
                    <Nav.Link  onClick={e => sessionStorage.clear()} href="/">Sign Out</Nav.Link>    
                </Nav>
            </Navbar>
        </Jumbotron>
        </>
    )
}

// sessionStorage.clear()