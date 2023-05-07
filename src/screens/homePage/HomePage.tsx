import PageTemplate from "../templates/PageTemplate";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import mockup from "../../assets/images/mock-up1.png";
import arrow from "../../assets/images/arrow-right.png";
import add from "../../assets/images/add.png";
import quote from "../../assets/images/quote.png";
import knowledge1 from "../../assets/images/knowledge1.png";
import knowledge2 from "../../assets/images/knowledge2.png";
import Item from "../../assets/images/Item.png";
import Frame20 from "../../assets/images/Frame 20.png";
import Frame19 from "../../assets/images/Frame 19.png";
import Frame21 from "../../assets/images/Frame 21.png";
import Frame22 from "../../assets/images/Frame 22.png";
import myFeed from "../../assets/images/my-feed.png";
import "./_HomePage.scss";
import { Col, Container, Row } from "react-bootstrap";
import { Grid } from "@mui/material";

function HomePage() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <PageTemplate>
      <Grid
        style={{ flex: 1, overflow: "hidden" }}
        container
        flexDirection="column"
      >
        <Row className="section1" style={{ display: "flex" }}>
          <Col xs={12} md={6}>
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
                    <img
                      src={arrow}
                      alt="mySvgImage"
                      className="button-image"
                    />
                  </div>
                </div>

                <div></div>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <img alt="mock-ups" className="mock-ups" src={mockup} />
          </Col>
          <Col xs={12} md={12}>
            <div className="destination" style={{ top: matches ? 0 : 140 }}>
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
          </Col>
          <Col xs={12} md={12}>
            <div
              className="bg-frame"
              style={{ display: "flex", top: matches ? -400 : 100 }}
            >
              <div className="blobs" style={{ top: matches ? -250 : 100 }}>
                {matches && (
                  <>
                    <div className="blob1" />
                    <div className="blob2" />
                    <div className="blob3" />
                    <div className="blob4" />
                    <div className="blob5" />
                    <div className="blob6" />
                    <div className="blob7" />
                    <div className="blob8" />
                  </>
                )}
                {matches ? (
                  <div className="frames">
                    <div className="frame133">
                      <text className="frame133-text2">Vision</text>
                      <h6 className="frame133-text1">
                        Our Vision: Connect every individual to the right tax
                        expert, creating success for both
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

                    <div className="frame9" style={{ height: "465px" }}>
                      <Row
                        style={{
                          flexWrap: matches ? "wrap" : "nowrap",
                          justifyContent: "space-evenly",

                          flexDirection: matches ? "row" : "column",
                          top: matches ? -300 : 400,
                          left: matches ? 130 : 0,
                          marginTop: 50,
                        }}
                      >
                        <Col xs={6}>
                          <Row style={{ margin: 5 }}>
                            <Col xs={3}>
                              <img
                                alt="frame9-update1-logo"
                                className="frame9-update1-logo"
                                src={Item}
                              />
                            </Col>
                            <Col xs={9}>
                              <text className="frame9-update1-text">
                                Latest updates on tax policies and other
                                developments
                              </text>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={6}></Col>
                        <Col xs={6}>
                          <Row style={{ margin: 5 }}>
                            <Col xs={3}>
                              <img
                                alt="frame9-update2-logo"
                                className="frame9-update1-logo"
                                src={Frame19}
                              />
                            </Col>
                            <Col xs={9}>
                              <text className="frame9-update1-text">
                                An AI-powered platform with a worldwide
                                community
                              </text>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={6}>
                          <Row style={{ margin: 5 }}>
                            <Col xs={3}>
                              <img
                                alt="frame9-update1-logo"
                                className="frame9-update1-logo"
                                src={Frame20}
                              />
                            </Col>
                            <Col xs={9}>
                              <text className="frame9-update1-text">
                                Matching individuals and businesses with the
                                right CPAs and firms
                              </text>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={6}>
                          <Row style={{ margin: 5 }}>
                            <Col xs={3}>
                              <img
                                alt="frame9-update1-logo"
                                className="frame9-update1-logo"
                                src={Frame21}
                              />
                            </Col>
                            <Col xs={9}>
                              <text className="frame9-update1-text">
                                NLP funtionality to answer any and all
                                tax-related questions
                              </text>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={6}>
                          <Row style={{ margin: 5 }}>
                            <Col xs={3}>
                              <img
                                alt="frame9-update1-logo"
                                className="frame9-update1-logo"
                                src={Frame22}
                              />
                            </Col>
                            <Col xs={9}>
                              <text className="frame9-update1-text">
                                Access to off-shore CPAs ready to support your
                                team
                              </text>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>

                    <div className="frame132">
                      <img alt="quote" className="frame132-icon" src={quote} />
                      <h2 className="frame132-text1">
                        One-Stop Shop for All Your Tax Needs
                      </h2>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="frame9" style={{ height: "600px" }}>
                      <Row
                        style={{
                          flexWrap: matches ? "wrap" : "nowrap",
                          justifyContent: "space-evenly",

                          flexDirection: matches ? "row" : "column",
                          top: matches ? -300 : 400,
                          left: matches ? 130 : 0,
                        }}
                      >
                        <Col xs={6}>
                          <Row style={{ margin: 5 }}>
                            <Col xs={3}>
                              <img
                                alt="frame9-update1-logo"
                                className="frame9-update1-logo"
                                src={Item}
                              />
                            </Col>
                            <Col xs={9}>
                              <text className="frame9-update1-text">
                                Latest updates on tax policies and other
                                developments
                              </text>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={6}></Col>
                        <Col xs={6}>
                          <Row style={{ margin: 5 }}>
                            <Col xs={3}>
                              <img
                                alt="frame9-update2-logo"
                                className="frame9-update1-logo"
                                src={Frame19}
                              />
                            </Col>
                            <Col xs={9}>
                              <text className="frame9-update1-text">
                                An AI-powered platform with a worldwide
                                community
                              </text>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={6}>
                          <Row style={{ margin: 5 }}>
                            <Col xs={3}>
                              <img
                                alt="frame9-update1-logo"
                                className="frame9-update1-logo"
                                src={Frame20}
                              />
                            </Col>
                            <Col xs={9}>
                              <text className="frame9-update1-text">
                                Matching individuals and businesses with the
                                right CPAs and firms
                              </text>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={6}>
                          <Row style={{ margin: 5 }}>
                            <Col xs={3}>
                              <img
                                alt="frame9-update1-logo"
                                className="frame9-update1-logo"
                                src={Frame21}
                              />
                            </Col>
                            <Col xs={9}>
                              <text className="frame9-update1-text">
                                NLP funtionality to answer any and all
                                tax-related questions
                              </text>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={6}>
                          <Row style={{ margin: 5 }}>
                            <Col xs={3}>
                              <img
                                alt="frame9-update1-logo"
                                className="frame9-update1-logo"
                                src={Frame22}
                              />
                            </Col>
                            <Col xs={9}>
                              <text className="frame9-update1-text">
                                Access to off-shore CPAs ready to support your
                                team
                              </text>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <div className="frame27-mobile">
                          <text className="frame133-text2">Vision</text>
                          <h6 className="frame133-text1">
                            Our Vision: Connect every individual to the right
                            tax expert, creating success for both
                          </h6>
                        </div>
                      </Row>
                      <Row>
                        <div className="frame27-mobile">
                          <h6 className="frame27-text1">
                            <b>Our Mission:</b>
                            Be the only destination for all your tax needs
                            globally
                          </h6>
                          <h6 className="frame27-text1"> Mission</h6>
                        </div>
                      </Row>
                    </div>
                    <div className="frame132">
                      <img alt="quote" className="frame132-icon" src={quote} />
                      <h2 className="frame132-text1">
                        One-Stop Shop for All Your Tax Needs
                      </h2>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <section className="screen2" style={{ top: matches ? 0 : 500 }}>
            {matches && (
              <>
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
                    See their service offerings and experience to decide if
                    they're right for you
                  </text>
                </div>
                <div className="frame32">
                  <text className="frame32-text1">
                    <b>Instant Messaging: </b>
                    Connect with your chosen CPA instantly to ask questions and
                    get started
                  </text>
                </div>
                <div className="profiles" />
              </>
            )}

            {!matches && (
              <>
                <Row>
                  <h2 className="find-text">
                    Find Your <b>Ideal Tax Partner</b> in Minutes...
                  </h2>
                </Row>
                <Row>
                  <div className="frame29">
                    <text className="frame29-text1">
                      <b>Star Rating: </b>
                      See ratings so you can choose with confidence
                    </text>
                  </div>
                </Row>
                <Row>
                  <div className="frame31">
                    <text className="frame31-text1">
                      <b>View Profile: </b>
                      See their service offerings and experience to decide if
                      they're right for you
                    </text>
                  </div>
                </Row>
                <Row>
                  <div className="frame32">
                    <text className="frame32-text1">
                      <b>Instant Messaging: </b>
                      Connect with your chosen CPA instantly to ask questions
                      and get started
                    </text>
                  </div>
                </Row>
              </>
            )}
          </section>
        </Row>

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
            <b>Join a Community</b> of Learners, Experts, and Everyone in
            Between
          </text>
          <div className="frame71">
            <text className="frame71-text1">
              Share Questions and Answers: Share your expertise or ask questions
              and get them answered by like-minded professionals
            </text>
          </div>
          <img alt="s4-img1" src={myFeed} className="my-feed" />
          <div className="frame-div">
            <div className="frame70">
              <text className="frame70-text">
                Quick Access: Save the service providers you work with often for
                quick access
              </text>
            </div>
            <div className="frame52">
              <text className="frame52-text">
                Posts and Publications: Read, share, and reply to posts from
                your connections
              </text>
            </div>
            <div className="frame69">
              <text className="frame69-text">
                User Profile: Create a profile to connect with other
                entrepreneurs, CPAs, and more
              </text>
            </div>
            <div className="frame72">
              <text className="frame72-text">
                Private Messaging: Connect with other users privately through
                instant messaging
              </text>
            </div>
            <div className="frame61">
              <text className="frame61-text">
                Grow Your Network: Suggested connections help you reach even
                more professionals
              </text>
            </div>
          </div>
          <div className="group5">
            <text className="group5-text1">Document</text>
            <text className="group5-text2">Management System</text>
          </div>
        </section>

        <div className="safari32" />
        <div className="frame80">
          <div className="frame80-image" />
        </div>
        <section className="screen5">
          <text className="screen5-text1">
            <strong>CPAs and Firms,</strong> Your Moment Has Come...
          </text>
          <text className="screen5-text2">
            Serving customers and storing documents is now 100% faster, easier,
            and more secure
          </text>
          <text className="screen5-text3">
            <b>Extend Your Team</b> with Off-Shore CPAs and Solve Problems
            Like...
          </text>
          <div className="frame88"></div>
          <div className="frame148"></div>
          <div className="frame147"></div>
        </section>

        <section className="screen6">
          <div className="frame93">
            <text className="frame93-text">Why Tax Global?</text>
          </div>
          <div>
            <div className="update1">
              <div className="update1-logo" />
              <text className="update1-text">
                Bookkeepers to Senior Accountants: Benefit from highly
                experienced professionals (2-5+ years)
              </text>
            </div>
            <div className="update2">
              <div className="update2-logo" />
              <text className="update2-text">
                Always Up-to-Date: Partner with professionals who are on top of
                the latest market and policy changes{" "}
              </text>
            </div>
            <div className="update3">
              <div className="update3-logo" />
              <text className="update3-text">
                Quick Scaling: Scale your team up or down with only 30 days
                notice required{" "}
              </text>
            </div>
            <div className="update4">
              <div className="update4-logo" />
              <text className="update4-text">
                Tax Policy Expertise: Add value with tax experts who specialize
                in US tax policies and filings{" "}
              </text>
            </div>
            <div className="update5">
              <div className="update5-logo" />
              <text className="update5-text">
                Bookkeepers to Senior Accountants: Benefit from highly
                experienced professionals (2-5+ years){" "}
              </text>
            </div>
            <div className="update6">
              <div className="update6-logo" />
              <text className="update6-text">
                Guaranteed Security: Enjoy banking-level security for business
                data and other sensitive information{" "}
              </text>
            </div>
          </div>
        </section>
      </Grid>
      <footer
        style={{
          zIndex: 8000,
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
        }}
      >
        <div className="frame94">
          <div className="frame162">
            <text className="footer-text1">
              Reach us at: info@taxglobal.com
            </text>
            <text className="footer-text2">Contact us: </text>
            <text className="footer-text3">Resources: </text>
            <text className="footer-text4">Company: </text>
            <text className="footer-text5">Support Extended team</text>
            <text className="footer-text6">FAQ Blogs</text>
            <text className="footer-text7">About Terms Privacy</text>
          </div>
          <div className="frame4">
            <text className="frame4-text">Copyright © 2023. Taxglobal Inc</text>
          </div>
        </div>
      </footer>
    </PageTemplate>
  );
}

export default HomePage;
