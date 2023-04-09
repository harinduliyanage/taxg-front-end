import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./_home-usp.scss";

const HomeGrid = () => {
  return (
    <section className="home-usps pb-6">
      <Container>
        <Row className="align-items-center">
          <Col md={7} className="mx-auto">
            <Row>
              <Col md={4} className="usp-item">
                <div className="display-5">90,000+</div>
                <p>
                  Tax/Accounting firms
                  <br />
                  In the USA
                </p>
              </Col>
              <Col md={4} className="usp-item">
                <div className="display-5">665,000+</div>
                <p>
                  Licensed CPAs
                  <br />
                  in the USA
                </p>
              </Col>
              <Col md={4} className="usp-item">
                <div className="display-5">1</div>
                <p>
                  Platform to
                  <br />
                  Connect all
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HomeGrid;
