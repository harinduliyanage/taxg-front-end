// import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./_TagSection.scss";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";

const TagSection = () => {
  const navigator = useNavigate();

  return (
    <section className="tag-section py-6">
      <Container>
        <h3>Other topics that might interest you</h3>
        <Row className="badge-list g-2 justify-content-start">
          <Col sm="auto">
            <Chip
              // bg="white"
              // text="primary"
              label="Sales tax advices for new businesses"
              onClick={() => {
                navigator(
                  "/knowledge/services/keyword/Sales%20tax%20advices%20for%20new%20businesses"
                );
              }}
            />
          </Col>
          <Col sm="auto">
            <Chip
              // bg="white"
              // text="primary"
              label="Selling in different states"
              onClick={() => {
                navigator(
                  "/knowledge/services/keyword/Selling%20in%20different%20states"
                );
              }}
            />
          </Col>
          <Col sm="auto">
            <Chip
              // bg="white"
              // text="primary"
              label="Expat taxation rules"
              onClick={() => {
                navigator(
                  "/knowledge/services/keyword/Expat%20taxation%20rules"
                );
              }}
            />
          </Col>
          <Col sm="auto">
            <Chip
              // bg="white"
              // text="primary"
              label="Employee vs independent contractor"
              onClick={() => {
                navigator(
                  "/knowledge/services/keyword/Employee%20vs%20independent%20contractor"
                );
              }}
            />
          </Col>
          <Col sm="auto">
            <Chip
              // bg="white"
              // text="primary"
              label="Tax treaty and exemption"
              onClick={() => {
                navigator(
                  "/knowledge/services/keyword/Tax%20treaty%20and%20exemption"
                );
              }}
            />
          </Col>
          <Col sm="auto">
            <Chip
              // bg="white"
              // text="primary"
              label="How virtual currency exclusion"
              onClick={() => {
                navigator(
                  "/knowledge/services/keyword/How%20virtual%20currency%20exclusion"
                );
              }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TagSection;
