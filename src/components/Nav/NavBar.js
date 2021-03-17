import React from "react"
import { Link } from "react-router-dom"
// import { authApi, userStorageKey } from "../auth/authSettings"
import "./NavBar.css"

export const NavBar = (props) => {


    return (
        <>
            <div className="titleblock">
                <h1 className="title"> Crusty's Craft Corral </h1>
                <h3 className="subHead">wranglin' creative endeavors for forty years </h3>
                <ul className="navbar">
                    <li className="navbar__item">
                        <Link className="navbar__link" to="/">Home</Link>
                    </li>
                    <li className="navbar__item active">
                        <Link className="navbar__link" to="/projects">Projects</Link>
                    </li>
                    <li className="navbar__item">
                        <Link className="navbar__link" to="/addProject">Add Project</Link>
                    </li>
                    <li className="navbar__item">
                        <Link className="navbar__link" onClick={e => sessionStorage.clear()} to="/">Sign Out</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

// sessionStorage.clear()