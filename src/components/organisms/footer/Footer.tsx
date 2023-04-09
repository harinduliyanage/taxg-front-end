import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./_footer.scss";
const Footer = () => {
  return (
    <footer className="py-3">
      <Container>
        <Row>
          <Col md="4">
            <span className="copyright-text">
              © TaxGlobal, Inc. All rights reserved.
            </span>
          </Col>
          <Col md="4" className="text-center">
            <span className="contact-email">
              Reach us at{" "}
              <a href="mailto:info@taxglobal.com">info@taxglobal.com</a>
            </span>
          </Col>
          <Col md="4">
            <nav className="ms-auto me-0">
              <ul>
                <li>
                  <a href="/about-us">About</a>
                </li>
                <li>
                  <a href="/privacy">Privacy</a>
                </li>
                <li>
                  <a href="/terms">Terms</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
