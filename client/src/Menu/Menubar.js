import React, {Component} from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Nav, Navbar} from "react-bootstrap";

/*
* This Component is Always shown and generates the Menubar in the top of the screen
* */
class Menubar extends Component {

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">S3DIT</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {/*LinkContainer have to be used to make the link work with React-Router*/}
                        <LinkContainer exact to="/" activename="active">
                            <Nav.Link>Filter</Nav.Link>
                        </LinkContainer>
                        <LinkContainer exact to="/sort/" activename="active">
                            <Nav.Link>Sort</Nav.Link>
                        </LinkContainer>
                        <LinkContainer exact to="/help/" activename="active">
                            <Nav.Link>Help</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav pullright="true">
                        <LinkContainer exact to="/submit/" activename="active">
                            <Nav.Link className="justify-content-end">Submit Technique</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Menubar;
