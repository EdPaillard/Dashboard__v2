import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import '../styles/Banner.css';


const Banner = () => {
    return (
            <div>
                <Navbar className="navBar" bg="primary" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">D'Hache B'Horde</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Accueil</Nav.Link>
                                <Nav.Link href="Dashboard">Dashboard</Nav.Link>
                                <Nav.Link href="Login">Se connecter</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
    )
}

export default Banner