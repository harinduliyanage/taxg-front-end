// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
import PageTemplate from "../templates/PageTemplate";
import mockup from "../../assets/images/mock-up1.png";
import arrow from "../../assets/images/arrow-right.png";
import add from "../../assets/images/add.png";
// import Container from "react-bootstrap/Container";
// import HomeGrid from "../../components/organisms/grids/HomeGrid";
// import ExpertCardSection from "../../components/organisms/expertcardsection/ExpertCardSection";
// import TagSection from "../../components/organisms/tagSection/TagSection";
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
      <section className="main-home-page">
        <section className="section1">
          <div className="frame1">
            <h2 className="frame1-text1">
              <b>One platform</b> for Everything Tax-Related
            </h2>
            <h6 className="frame1-text2">
              Whether you're a CPA or looking for one, get your tax questions
              answered, match with CPAs through our proprietary AI algorithm,
              and find all the tax-related info you need to keep your clients
              happy and thriving.
            </h6>
            <div className="inner-frame">
              <div className="button-div1">
                <div className="button-div2">
                  <h6 className="button-text">Get Started</h6>
                  <img src={arrow} alt="mySvgImage" className="button-image" />
                </div>
              </div>

              <div></div>
            </div>
          </div>
          <img alt="mock-ups" className="mock-ups" src={mockup} />
          <div className="destination">
            <div className="frame130">
              <h2 className="frame130-text1">
                №1 Destination for Everything Taxes
              </h2>
            </div>
            <div className="frame155">
              <div className="frame23">
                <h2 className="frame23-text1">90,000</h2>
                <h6 className="frame23-text2">
                  Tax/Accounting Firms in the USA
                </h6>
              </div>
              <div className="frame24">
                <div className="frame26">
                  <h2 className="frame26-text1">665,000</h2>
                  <div className="frame25">
                    <img src={add} className="add-icon" alt="add" />
                  </div>
                </div>
                <h6 className="frame24-text1">Licensed CPAs in the USA</h6>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-frame"></section>
        {/* <Container>
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
        </Container> */}
      </section>
      {/* <HomeGrid />
      <ExpertCardSection />
      <TagSection /> */}
    </PageTemplate>
  );
}

export default HomePage;