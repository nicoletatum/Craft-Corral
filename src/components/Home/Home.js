import React from "react";
import "./Home.css"
import Crusty from "../crusty.png"

export const Home = () => (
    <>
        <h2>Welcome!</h2>
        <small>Here at Crusty’s we have one goal. To wrangle up all those projects ya’ll got running around into one, user friendly project board. We understand how hard it can be for some folks who like to create/fix things but might have a touch of the ADHD. 
To get started click ‘add projects’ to the right. Or, if you already have a project board and want to edit/delete/take a gander at it click ‘view projects.’</small>
<div><img src={Crusty} alt="crusty" className="crusty"></img></div>
    </>
)