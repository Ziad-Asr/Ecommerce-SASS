import { HeaderBaskect } from "../../eCommerce";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";

import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
const { headerContainer, headerLogo } = styles;

const Header = () => {
  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Our</span> <Badge bg="info">Ecom</Badge>
        </h1>

        <HeaderBaskect />
      </div>

      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about-us">
                About
              </Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link as={NavLink} to="/auth/login">
                Login
              </Nav.Link>
              <Nav.Link href="/auth/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
