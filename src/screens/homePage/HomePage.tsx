// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
import PageTemplate from "../templates/PageTemplate";
import mockup from "../../assets/images/mock-up1.png";
import arrow from "../../assets/images/arrow-right.png";
import add from "../../assets/images/add.png";
import quote from "../../assets/images/quote.png";
import knowledge1 from "../../assets/images/knowledge1.png";
import knowledge2 from "../../assets/images/knowledge2.png";
import "./_HomePage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/organisms/seo/SEO";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const navigator = useNavigate();

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
              <strong>One platform</strong> for Everything Tax-Related
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
        </section>
        <div className="bg-frame">
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
          <div className="blobs">
            <div className="blob1" />
            <div className="blob2" />
            <div className="blob3" />
            <div className="blob4" />
            <div className="blob5" />
            <div className="blob6" />
            <div className="blob7" />
            <div className="blob8" />
            <div className="frames">
              <div className="frame133">
                <text className="frame133-text2">Vision</text>
                <h6 className="frame133-text1">
                  Our Vision: Connect every individual to the right tax expert,
                  creating success for both
                </h6>
              </div>
              <div className="frame27">
                <h6 className="frame27-text1">
                  <b>Our Mission:</b>
                  Be the only destination for all your tax needs globally
                </h6>
                <h6 className="frame27-text1"> Mission</h6>
              </div>
              <div className="frame81"></div>
              <div className="frame9"></div>

              <div className="frame132">
                <img alt="quote" className="frame132-icon" src={quote} />
                <h2 className="frame132-text1">
                  One-Stop Shop for All Your Tax Needs
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="screen2">
        <h2 className="find-text">
          Find Your <b>Ideal Tax Partner</b> in Minutes...
        </h2>
        <div className="frame29">
          <text className="frame29-text1">
            {" "}
            <b>Star Rating: </b>
            See ratings so you can choose with confidence
          </text>
        </div>
        <div className="frame31">
          <text className="frame31-text1">
            <b>View Profile: </b>
            See their service offerings and experience to decide if they're
            right for you
          </text>
        </div>
        <div className="frame32">
          <text className="frame32-text1">
            <b>Instant Messaging: </b>
            Connect with your chosen CPA instantly to ask questions and get
            started
          </text>
        </div>
      </section>
      <div className="profiles"></div>
      <section className="screen3">
        <text className="screen3-text1">
          Get Your <b>Tax Questions</b> Answered in Seconds
        </text>
        <text className="questions1">Questions</text>
        <img alt="s3-img1" src={knowledge2} className="screen3-image1" />
        <img alt="s3-img2" src={knowledge1} className="screen3-image2" />
        <div className="stepper1">
          <div className="stepper1-atom1">
            <div className="stepper-number-icon">
              {" "}
              <text className="stepper-number">1</text>
            </div>
          </div>
          <text className="stepper1-text">
            Learn More: See the answers given to other users who asked similar
            questions
          </text>
        </div>
        <div className="stepper2">
          <div className="stepper2-atom1">
            <div className="stepper-number-icon">
              {" "}
              <text className="stepper-number">2</text>
            </div>
          </div>
          <text className="stepper2-text">
            AI Powered Answers: We quickly scan all relevant sources to bring
            you the most accurate, up-to-date answer
          </text>
        </div>
        <div className="stepper3">
          <div className="stepper3-atom1">
            <div className="stepper-number-icon">
              {" "}
              <text className="stepper-number">3</text>
            </div>
          </div>
          <text className="stepper3-text">
            Ask Questions: Simply type in your tax-related question
          </text>
        </div>
      </section>
      <section className="screen4">
        <text className="screen4-text2">Community</text>
        <text className="screen4-text1">
          <b>Join a Community</b> of Learners, Experts, and Everyone in Between
        </text>
        <div className="frame71">
          <text className="frame71-text1">
            Share Questions and Answers: Share your expertise or ask questions
            and get them answered by like-minded professionals
          </text>
        </div>
        <div className="my-feed" />
      </section>
      <section className="screen5"></section>
      <section className="screen6"></section>
    </PageTemplate>
  );
}

export default HomePage;
