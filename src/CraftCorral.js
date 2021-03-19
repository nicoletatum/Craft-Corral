import { Route, Redirect } from "react-router-dom"
import { NavBar } from "./components/Nav/NavBar.js"
import { ApplicationViews } from "./components/ApplicationViews.js"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { userStorageKey } from "./components/auth/authSettings"
// import 'bootstrap/dist/css/bootstrap.min.css'
import "../src/CraftCorral.css"

export const CraftCorral = () => (
    <>
        <Route render={() => {
            if (sessionStorage.getItem(userStorageKey)) {
                return (
                    <>
                        <NavBar />
                        <ApplicationViews />
                    </>
                )
            } else {
                return <Redirect to="/login" />;
            }
        }} />

        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
    </>
)