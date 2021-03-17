import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home/Home"

export const ApplicationViews = () => {
    return (
        <>
        {/* <p>test application views</p> */}
        <Route exact path="/">
                <Home />
            </Route>
        </>
    )
}