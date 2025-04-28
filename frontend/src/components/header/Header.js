import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink, useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/" style={{"color":'white'}}>
                    <FontAwesomeIcon icon ={faVideoSlash}/>MovieMinds
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <NavLink className ="nav-link" to="/">Home</NavLink>
                        <NavLink className ="nav-link" to="/watchList">Watch List</NavLink>      
                    </Nav>
                    <Nav>
                        {currentUser ? (
                            <>
                                <span className="nav-link text-white">Welcome, {currentUser.username}</span>
                                <Button variant="outline-info" onClick={handleLogout}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline-info" className="me-2" onClick={() => navigate('/login')}>Login</Button>
                                <Button variant="outline-info" onClick={() => navigate('/register')}>Register</Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
