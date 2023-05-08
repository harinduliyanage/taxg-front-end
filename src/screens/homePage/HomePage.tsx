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
import Logo1 from "../../assets/images/logo1.svg";
import Frame20 from "../../assets/images/Frame 20.png";
import Frame19 from "../../assets/images/Frame 19.png";
import Frame21 from "../../assets/images/Frame 21.png";
import Frame22 from "../../assets/images/Frame 22.png";
import myFeed from "../../assets/images/my-feed.png";
import Profiles from "../../assets/images/profiles.png";
import Safari from "../../assets/images/safari32.png";
import Frame90 from "../../assets/images/frame90.png";
import "./_HomePage.scss";
import { Col, Row } from "react-bootstrap";
import { Grid } from "@mui/material";
import { relative } from "path";

function HomePage() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <PageTemplate>
      {matches && (
        <>
          <div className="navigation">
            <img
              alt="navigation-logo"
              className="navigation-logo"
              src={Logo1}
            />
            <div className="frame48">
              <div className="button-div1-nav">
                <button className="frame48-button1">Log In</button>
              </div>
              <div className="button-div2-nav">
                <button className="frame48-button2">Sign Up</button>
              </div>
            </div>
          </div>
          <Grid
            style={{ flex: 1, overflow: "hidden" }}
            container
            flexDirection="column"
          >
            <Row
              className="section1"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Col xs={12} md={6} style={{ height: "40%" }}>
                <div className="frame1">
                  <h2 className="frame1-text1">
                    <strong>One platform</strong> for Everything Tax-Related
                  </h2>
                  <h6 className="frame1-text2">
                    Whether you're a CPA or looking for one, get your tax
                    questions answered, match with CPAs through our proprietary
                    AI algorithm, and find all the tax-related info you need to
                    keep your clients happy and thriving.
                  </h6>
                  <div className="inner-frame">
                    <div className="button-div1">
                      <div className="button-div2">
                        <text className="button-text">Get Started</text>
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
              <Col
                xs={12}
                md={6}
                style={{ alignItems: "center", height: "40%" }}
              >
                <img alt="mock-ups" className="mock-ups" src={mockup} />
              </Col>
              <Col xs={12} md={12} style={{ alignItems: "flex-start" }}>
                <div className="destination">
                  <div className="frame130">
                    <text className="frame130-text1">
                      №1{" "}
                      <text style={{ color: "#BFBED2" }}>
                        Destination for Everything Taxes
                      </text>
                    </text>
                  </div>
                  <div className="frame155">
                    <div className="frame23">
                      <text className="frame23-text1">90,000</text>
                      <text className="frame23-text2">
                        Tax/Accounting Firms in the USA
                      </text>
                    </div>
                    <div className="frame24">
                      <div className="frame26">
                        <text className="frame26-text1">665,000</text>
                        <div className="frame25">
                          <img src={add} className="add-icon" alt="add" />
                        </div>
                      </div>
                      <text className="frame24-text1">
                        Licensed CPAs in the USA
                      </text>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={12}>
                <div
                  className="bg-frame"
                  style={{ display: "flex", top: -600 }}
                >
                  <div className="frames">
                    <div className="frame133">
                      <div
                        style={{
                          position: "absolute",
                          flexDirection: "column",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "240px",
                          height: "121px",
                          left: "90px",
                          top: "55px",
                        }}
                      >
                        <text className="frame133-text1">Our Vision:</text>
                        <text
                          className="frame133-text3"
                          style={{ color: "#1D1B4199" }}
                        >
                          Connect every individual to the right tax expert,
                          creating success for both
                        </text>
                      </div>
                    </div>
                    <text className="frame133-text2">Vision</text>
                    <div className="frame27">
                      <div
                        style={{
                          position: "absolute",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          display: "flex",
                          width: "240px",
                          height: "121px",
                          left: "90px",
                          top: "50px",
                        }}
                      >
                        <text
                          className="frame27-text1"
                          style={{ fontWeight: 800 }}
                        >
                          Our Mission:
                        </text>
                        <text
                          className="frame27-text1"
                          style={{ color: "#1D1B4199" }}
                        >
                          Be the only destination for all your tax needs
                          globally
                        </text>
                      </div>
                      <text className="frame27-text2"> Mission</text>
                    </div>
                    <div className="frame81"></div>

                    <div className="frame9" style={{ height: "465px" }}>
                      <Row
                        style={{
                          flexWrap: "wrap",
                          justifyContent: "space-evenly",

                          flexDirection: "row",
                          top: -300,
                          left: 130,
                          marginTop: 50,
                        }}
                      >
                        <Col xs={6}>
                          <Row style={{ margin: 10 }}>
                            <Col xs={4}>
                              <img
                                alt="frame9-update1-logo"
                                className="frame9-update1-logo"
                                src={Item}
                              />
                            </Col>
                            <Col xs={8}>
                              <text className="frame9-update1-text">
                                <text
                                  style={{
                                    color: "#302D6D",
                                    fontWeight: 800,
                                  }}
                                >
                                  Latest updates
                                </text>{" "}
                                on tax policies and other developments
                              </text>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={6}></Col>
                        <Col xs={6}>
                          <Row style={{ margin: 10 }}>
                            <Col xs={4}>
                              <img
                                alt="frame9-update2-logo"
                                className="frame9-update1-logo"
                                src={Frame19}
                              />
                            </Col>
                            <Col xs={8}>
                              <text className="frame9-update1-text">
                                <text
                                  style={{
                                    color: "#302D6D",
                                    fontWeight: 800,
                                  }}
                                >
                                  An AI-powered
                                </text>{" "}
                                platform with a worldwide community
                              </text>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={6}>
                          <Row style={{ margin: 10 }}>
                            <Col xs={4}>
                              <img
                                alt="frame9-update1-logo"
                                className="frame9-update1-logo"
                                src={Frame20}
                              />
                            </Col>
                            <Col xs={8}>
                              <text className="frame9-update1-text">
                                <text
                                  style={{
                                    color: "#302D6D",
                                    fontWeight: 800,
                                  }}
                                >
                                  Matching individuals
                                </text>{" "}
                                and businesses with the right CPAs and firms
                              </text>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={6}>
                          <Row style={{ margin: 10 }}>
                            <Col xs={4}>
                              <img
                                alt="frame9-update1-logo"
                                className="frame9-update1-logo"
                                src={Frame21}
                              />
                            </Col>
                            <Col xs={8}>
                              <text className="frame9-update1-text">
                                <text
                                  style={{
                                    color: "#302D6D",
                                    fontWeight: 800,
                                  }}
                                >
                                  NLP funtionality
                                </text>{" "}
                                to answer any and all tax-related questions
                              </text>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={6}>
                          <Row style={{ margin: 10 }}>
                            <Col xs={4}>
                              <img
                                alt="frame9-update1-logo"
                                className="frame9-update1-logo"
                                src={Frame22}
                              />
                            </Col>
                            <Col xs={8}>
                              <text className="frame9-update1-text">
                                <text
                                  style={{
                                    color: "#302D6D",
                                    fontWeight: 800,
                                  }}
                                >
                                  NAccess to off-shore CPAs
                                </text>{" "}
                                ready to support your team
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
                  <div className="blobs" style={{ top: -50 }}>
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
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <section className="screen2">
                <>
                  <h2 className="find-text">
                    Find Your{" "}
                    <text style={{ fontWeight: 1000 }}>Ideal Tax Partner</text>{" "}
                    in Minutes...
                  </h2>
                  <div className="frame29">
                    <div className="frame29-div">
                      <text
                        className="frame29-text1"
                        style={{ color: "#008774" }}
                      >
                        Star Rating:
                      </text>
                      <text style={{ color: "EAEAF0", fontWeight: 10 }}>
                        See ratings so you can choose with confidence
                      </text>
                    </div>
                  </div>
                  <div className="frame31">
                    <div className="frame31-div">
                      <text
                        className="frame31-text1"
                        style={{ color: "#008774" }}
                      >
                        {" "}
                        View Profile:{" "}
                      </text>
                      <text style={{ color: "EAEAF0", fontWeight: 10 }}>
                        See their service offerings and experience to decide if
                        they're right for you
                      </text>
                    </div>
                  </div>
                  <div className="frame32">
                    <div className="frame32-div">
                      <text className="frame32-text1">Instant Messaging:</text>
                      <text style={{ color: "EAEAF0", fontWeight: 10 }}>
                        Connect with your chosen CPA instantly to ask questions
                        and get started
                      </text>
                    </div>
                  </div>
                  <img className="profiles" alt="profiles" src={Profiles} />
                </>
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
                  Learn More: See the answers given to other users who asked
                  similar questions
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
                  AI Powered Answers: We quickly scan all relevant sources to
                  bring you the most accurate, up-to-date answer
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
                <text style={{ fontWeight: 800 }}>Join a Community</text> of
                Learners, Experts, and Everyone in Between
              </text>
              <div className="frame71">
                <text className="frame71-text1">
                  Share Questions and Answers: Share your expertise or ask
                  questions and get them answered by like-minded professionals
                </text>
              </div>
              <img alt="s4-img1" src={myFeed} className="my-feed" />
              <div className="frame-div">
                <div className="frame70">
                  <text className="frame70-text">
                    Quick Access: Save the service providers you work with often
                    for quick access
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
                    Private Messaging: Connect with other users privately
                    through instant messaging
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

            <img className="safari32" alt="safari32" src={Safari} />
            <div className="frame80">
              <img className="frame80-image" alt="frame80-img" src={Frame90} />
            </div>
            <section className="screen5">
              <text className="screen5-text1">
                <text style={{ fontWeight: 800 }}>CPAs and Firms,</text> Your
                Moment Has Come...
              </text>
              <text className="screen5-text2">
                Serving customers and storing documents is now 100% faster,
                easier, and more secure
              </text>
              <text className="screen5-text3">
                <text style={{ fontWeight: 800 }}>Extend Your Team</text> with
                Off-Shore CPAs and Solve Problems Like...
              </text>
              <div className="frame88"></div>
              <div className="frame148"></div>
              <div className="frame147"></div>
            </section>

            <section className="screen6">
              <div className="frame93">
                <text className="frame93-text">Why Tax Global?</text>
              </div>
              <div style={{ position: "relative", top: -270 }}>
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
                    Always Up-to-Date: Partner with professionals who are on top
                    of the latest market and policy changes{" "}
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
                    Tax Policy Expertise: Add value with tax experts who
                    specialize in US tax policies and filings{" "}
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
                    Guaranteed Security: Enjoy banking-level security for
                    business data and other sensitive information{" "}
                  </text>
                </div>
              </div>
            </section>
          </Grid>
          <footer
            style={{
              zIndex: 8000,
              top: 8400,
              position: "absolute",
              left: 0,
              bottom: 0,
              right: 0,
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
                <text className="frame4-text">
                  Copyright © 2023. Taxglobal Inc
                </text>
              </div>
            </div>
          </footer>
        </>
      )}

      {!matches && (
        <Grid className="mobile-screen1">
          <div className="frame157">
            <div className="frame156" />
            <div className="sort" />
          </div>
          <div className="bg-frame-mobile"></div>
          <div className="frame153">
            <text className="frame153-text1">
              One platform for Everything Tax-Related
            </text>
            <text className="frame153-text2">
              Whether you're a CPA or looking for one, get your tax questions
              answered, match with CPAs through our proprietary AI algorithm,
              and find all the tax-related info you need to keep your clients
              happy and thriving.
            </text>
            <button className="frame153-button">Get Started</button>
          </div>
          <img alt="mock-ups" className="mock-ups-mobile" src={mockup} />
          <div className="destination-mobile">
            <div className="frame130-mobile">
              <text className="frame130-text1-mobile">
                №1 Destination for Everything Taxes
              </text>
            </div>
            <div className="frame155-mobile">
              <div className="frame23-mobile">
                <text className="frame23-text1-mobile">90,000</text>
                <text className="frame23-text2-mobile">
                  Tax/Accounting Firms in the USA
                </text>
              </div>
              <div className="frame24-mobile">
                <div className="frame26-mobile">
                  <text className="frame26-text1-mobile">665,000</text>
                  <div className="frame25-mobile">
                    <img src={add} className="add-icon-mobile" alt="add" />
                  </div>
                </div>
                <text className="frame24-text1-mobile">
                  Licensed CPAs in the USA
                </text>
              </div>
            </div>
          </div>
          <div className="frame9-mobile">
            <Row>
              <Col className="frame-updates" xs={12}>
                <Row>
                  <Col xs={3}>
                    <img
                      alt="frame9-update1-logo-mobile"
                      className="frame9-update1-logo-mobile"
                      src={Item}
                    />
                  </Col>
                  <Col xs={9}>
                    <text className="frame9-update1-text-mobile">
                      Latest updates on tax policies and other developments
                    </text>
                  </Col>
                </Row>
              </Col>
              <Col className="frame-updates" xs={12}>
                <Row>
                  <Col xs={3}>
                    <img
                      alt="frame9-update2-logo-mobile"
                      className="frame9-update2-logo-mobile"
                      src={Frame19}
                    />
                  </Col>
                  <Col xs={9}>
                    <text className="frame9-update2-text-mobile">
                      An AI-powered platform with a worldwide community
                    </text>
                  </Col>
                </Row>
              </Col>
              <Col className="frame-updates" xs={12}>
                <Row>
                  <Col xs={3}>
                    <img
                      alt="frame9-update3-logo-mobile"
                      className="frame9-update3-logo-mobile"
                      src={Frame20}
                    />
                  </Col>
                  <Col xs={9}>
                    <text className="frame9-update3-text-mobile">
                      Matching individuals and businesses with the right CPAs
                      and firms
                    </text>
                  </Col>
                </Row>
              </Col>
              <Col className="frame-updates" xs={12}>
                <Row>
                  <Col xs={3}>
                    <img
                      alt="frame9-update4-logo-mobile"
                      className="frame9-update4-logo-mobile"
                      src={Frame21}
                    />
                  </Col>
                  <Col xs={9}>
                    <text className="frame9-update4-text-mobile">
                      NLP funtionality to answer any and all tax-related
                      questions
                    </text>
                  </Col>
                </Row>
              </Col>
              <Col className="frame-updates" xs={12}>
                <Row>
                  <Col xs={3}>
                    <img
                      alt="frame9-update5-logo-mobile"
                      className="frame9-update5-logo-mobile"
                      src={Frame22}
                    />
                  </Col>
                  <Col xs={9}>
                    <text className="frame9-update5-text-mobile">
                      Access to off-shore CPAs ready to support your team
                    </text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div className="frame132-mobile">
            <img alt="quote" className="frame132-icon" src={quote} />
            <h2 className="frame132-text1-mobile">
              One-Stop Shop for All Your Tax Needs
            </h2>
          </div>
          <div className="frame133-mobile">
            <text className="frame133-text1-mobile">
              Our Vision: Connect every individual to the right tax expert,
              creating success for both
            </text>
          </div>
          <div className="frame154-mobile">
            <text className="frame154-text1-mobile">
              Our Mission: Be the only destination for all your tax needs
              globally
            </text>
          </div>
          <div className="mobile2">
            <text className="find-text-mobile">
              Find Your <b>Ideal Tax Partner</b> in Minutes...
            </text>
          </div>
          <div className="stepper-mobile">
            <div className="frame29-mobile">
              <text className="frame29-text1-mobile">
                {" "}
                <b>Star Rating: </b>
                See ratings so you can choose with confidence
              </text>
            </div>
            <div className="frame29-mobile">
              <text className="frame29-text1-mobile">
                <b>View Profile: </b>
                See their service offerings and experience to decide if they're
                right for you
              </text>
            </div>
            <div className="frame29-mobile">
              <text className="frame29-text1-mobile">
                <b>Instant Messaging: </b>
                Connect with your chosen CPA instantly to ask questions and get
                started
              </text>
            </div>
          </div>
        </Grid>
      )}
    </PageTemplate>
  );
}

export default HomePage;
