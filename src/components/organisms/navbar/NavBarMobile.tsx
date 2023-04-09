import React, { useState } from "react";
import {
  Button,
  Navbar,
  Offcanvas,
  Nav,
  Dropdown,
  Container,
} from "react-bootstrap";
import logo from "../../../assets/images/Taxglobal-logo.svg";
import "./_mobile-nav.scss";

const NavBarMobile = () => {
  const [offCanvasShow, setOffCanvasShow] = useState(false);

  const handleMenuClose = () => setOffCanvasShow(false);
  const handleMenuShow = () => setOffCanvasShow(true);

  return (
    <>
      <Navbar bg="white" sticky="top" className="main-nav">
        <Container fluid>
          <Button
            variant="white"
            className="menu-icon me-3"
            onClick={handleMenuShow}
          >
            <div className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </Button>
          <Navbar.Brand href="/">
            <img src={logo} alt="" />
          </Navbar.Brand>
          <Button variant="white" className="search-open ms-auto">
            <i className="far fa-search me-0"></i>
          </Button>

          <Nav className="account me-0">
            <Nav.Link href="#link" className="notification" disabled>
              <i className="fas fa-bell" />
            </Nav.Link>
            <Dropdown align="end">
              <Dropdown.Toggle id="myaccount-dropdown" variant="link">
                <span className="avatar">
                  <img src={logo} alt="user avatar" />
                </span>{" "}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/my-profile" eventKey="1">
                  My profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="2">Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="3" className="text-danger">
                  Sign out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

      <Offcanvas show={offCanvasShow} onHide={handleMenuClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavBarMobile;
