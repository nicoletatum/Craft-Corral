import React from "react";
import "./Home.css"
import Crusty from "../crusty.png"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const Home = () => (
    <>
        <Container>
        <h2>Welcome!</h2>
            <Row className="welcome">
                <Col>
                Here at Crusty’s we have one goal. To wrangle up all those projects ya’ll got running around into one, user friendly project board. We understand how hard it can be for some folks who like to create/fix things but might have a touch of the ADHD.
            To get started click ‘Add Project’ up above. Or, if you already have a project board and want to edit/delete/take a gander at it click ‘Projects.’</Col>
            <Col><img src={Crusty} alt="crusty" className="crusty"></img></Col>
            </Row>
        </Container>
    </>
)