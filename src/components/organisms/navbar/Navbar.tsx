import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import MediaQuery from "react-responsive";
import { useNavigate, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import GlobalSearch from "./globalSearch";

import "./_Navbar.scss";
import "./_mobile-nav.scss";
import avatar from "../../../assets/images/avatar-default.svg";
import logo from "../../../assets/images/Taxglobal-logo.svg";
import {
  USER_SIGNOUT_INIT,
  USER_SIGNOUT_FAILURE,
  USER_SIGNOUT_SUCCESS,
} from "../../../redux/constants";
import {
  Dropdown,
  Container,
  Nav,
  Navbar,
  Offcanvas,
  Button,
} from "react-bootstrap";

const NavBar = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((root: any) => root.auth);

  const [userProfileImage, setUserProfileImage] = useState("");
  const [offCanvasShow, setOffCanvasShow] = useState(false);

  useEffect(() => {
    if (user?.profilePhoto_url) {
      setUserProfileImage(user?.profilePhoto_url);
    }
  }, [user?.profilePhoto_url]);

  const signOut = () => {
    setTimeout(() => {
      dispatch({ type: USER_SIGNOUT_INIT });
    }, 1500);

    Auth.signOut()
      .then(() => {
        dispatch({ type: USER_SIGNOUT_SUCCESS });
        navigator("/");
      })
      .catch((err) => dispatch({ type: USER_SIGNOUT_FAILURE }));
  };

  if (loading) {
    return <div />;
  }

  const handleMenuClose = () => setOffCanvasShow(false);
  const handleMenuShow = () => setOffCanvasShow(true);

  const NavLinks = () => {
    return (
      <>
        {user ? (
          <>
            <Nav.Link
              href="/feed"
              className={location.pathname === "/feed" ? "active" : ""}
            >
              My feed
            </Nav.Link>
            <Nav.Link
              href="/discover"
              className={
                location.pathname.startsWith("/discover") ? "active" : ""
              }
            >
              Discover
            </Nav.Link>
            <Nav.Link
              href="/knowledge"
              className={
                location.pathname.startsWith("/knowledge") ? "active" : ""
              }
            >
              Knowledge
            </Nav.Link>
            <Nav.Link
              href="/resources"
              className={location.pathname === "/resources" ? "active" : ""}
            >
              Resources
            </Nav.Link>
            <Nav.Link
              href="/services"
              className={
                location.pathname.startsWith("/services") ? "active" : ""
              }
            >
              Services
            </Nav.Link>
            {/* <Nav.Link
                  href="/learning"
                  className={location.pathname === "/learning" ? "active" : ""}
                >
                  Learning
                </Nav.Link> */}
          </>
        ) : (
          <>
            <Nav.Link
              href="/login"
              className={location.pathname === "/feed" ? "active" : ""}
            >
              My feed
            </Nav.Link>
            <Nav.Link
              href="/login"
              className={
                location.pathname === "/discover" ||
                location.pathname === "/discover/discover.page2"
                  ? "active"
                  : ""
              }
            >
              Discover
            </Nav.Link>
            <Nav.Link
              href="/login"
              className={location.pathname === "/knowledge" ? "active" : ""}
            >
              Knowledge
            </Nav.Link>
            <Nav.Link
              href="/login"
              className={location.pathname === "/resources" ? "active" : ""}
            >
              Resources
            </Nav.Link>
            <Nav.Link
              href="/login"
              className={location.pathname === "/services" ? "active" : ""}
            >
              Services
            </Nav.Link>
          </>
        )}
      </>
    );
  };

  const LoggedUserNav = () => {
    return (
      <>
        {user && (
          <Nav className="account me-0">
            <Nav.Link href="#link" className="notification" disabled>
              <i className="fas fa-bell" />
            </Nav.Link>
            <Dropdown align="end">
              <Dropdown.Toggle id="myaccount-dropdown" variant="link">
                <span className="avatar">
                  <img
                    src={userProfileImage ? userProfileImage : avatar}
                    alt="user avatar"
                  />
                </span>{" "}
                <span className="user">{user.user_first_name}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/my-profile" eventKey="1">
                  My profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="2">Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  eventKey="3"
                  onClick={() => signOut()}
                  className="text-danger"
                >
                  Sign out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        )}
      </>
    );
  };

  const NewUserNav = () => {
    return (
      <>
        {!user && (
          <>
            <MediaQuery maxWidth={576}>
              <Nav className="account ms-0 me-0 mobile-submenu">
                <Nav.Link
                  href="/login"
                  className={location.pathname === "/login" ? "active" : ""}
                >
                  Sign In
                </Nav.Link>
                <span className="link-seperator" />
                <Nav.Link
                  href="/register"
                  className={location.pathname === "/register" ? "active" : ""}
                >
                  Register
                </Nav.Link>
              </Nav>
            </MediaQuery>
            <MediaQuery minWidth={577}>
              <Nav className="account ms-4 me-0">
                <Nav.Link
                  href="/login"
                  className={location.pathname === "/login" ? "active" : ""}
                >
                  Sign In
                </Nav.Link>
                <span className="link-seperator" />
                <Nav.Link
                  href="/register"
                  className={location.pathname === "/register" ? "active" : ""}
                >
                  Register
                </Nav.Link>
              </Nav>
            </MediaQuery>
          </>
        )}
      </>
    );
  };

  const NavBarMobile = () => {
    return (
      <>
        <Navbar bg="white" sticky="top" className="main-nav mobile">
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
            <Navbar.Brand href="/" className="ms-0 me-auto">
              <img src={logo} alt="" />
            </Navbar.Brand>
            <GlobalSearch />

            <LoggedUserNav />
            <NewUserNav />
          </Container>
        </Navbar>

        <Offcanvas show={offCanvasShow} onHide={handleMenuClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <NavLinks />
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  };

  return (
    <>
      <MediaQuery maxWidth={992}>
        <NavBarMobile />
      </MediaQuery>
      <MediaQuery minWidth={993}>
        <Navbar bg="white" expand="lg" sticky="top" className="main-nav">
          <Container>
            <Navbar.Brand href="/">
              <img src={logo} alt="" />
            </Navbar.Brand>
            <GlobalSearch />
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <NavLinks />

                <LoggedUserNav />
              </Nav>

              <NewUserNav />
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </MediaQuery>
    </>
  );
};

export default NavBar;
