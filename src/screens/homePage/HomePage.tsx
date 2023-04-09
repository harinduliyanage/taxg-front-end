import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import PageTemplate from "../templates/PageTemplate";
import Container from "react-bootstrap/Container";
import HomeGrid from "../../components/organisms/grids/HomeGrid";
import ExpertCardSection from "../../components/organisms/expertcardsection/ExpertCardSection";
import TagSection from "../../components/organisms/tagSection/TagSection";
import "./_HomePage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/organisms/seo/SEO";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const navigator = useNavigate();

  // const onSubmitHandler = (e: any) => {
  //   if (searchQuery.startsWith("looking for")) {
  //     navigator(`/discover/services/results`);
  //   } else {
  //     navigator(`/discover/services/keyword/${searchQuery}`);
  //   }
  // };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    navigator(`/discover/services/keyword/${searchQuery}`);
  };

  return (
    <PageTemplate>
      <SEO
        title="TaxGlobal"
        description="TaxGlobal, Connect CPA, Tax, Tax Providers"
      />
      <section className="main-banner">
        <Container>
          <h1>Welcome to your tax community</h1>
          <h3>We bring AI powered personalized services for you</h3>
          <div className="get-start">
            <Form className="start-form">
              <Row className="align-items-center g-2">
                <Col className="col-9" md={8}>
                  <Form.Label
                    htmlFor="inlineFormInput"
                    visuallyHidden
                    type="search"
                  >
                    Name
                  </Form.Label>
                  <Form.Control
                    id="inlineFormInput"
                    placeholder="What kind of services are you looking for"
                    onKeyPress={(e) => {
                      e.key === "Enter" && onSubmitHandler(e);
                    }}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                  />
                </Col>
                <Col className="col-3" md={4}>
                  <Button
                    variant="dark"
                    type="submit"
                    onClick={() => {
                      navigator(`/discover/services/keyword/${searchQuery}`);
                    }}
                  >
                    <span>Get started</span>
                    <i className="fal fa-long-arrow-right"></i>
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Container>
      </section>
      <HomeGrid />
      <ExpertCardSection />
      <TagSection />
    </PageTemplate>
  );
}

export default HomePage;
