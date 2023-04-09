import ProfileProgress from "../../components/organisms/profile/ProfileProgress";
import ProfileAvatar from "../../components/organisms/cards/ProfileAvatar";
import { headerConfig } from "../../actions/headers";
import { Auth } from "aws-amplify";
import axios from "axios";
import { USER_DATA_API } from "../../actions/endPoints";
import { useState, useEffect } from "react";
import { ProfileData } from "../../interfaces/models/ProfileData";
// import coverImageDefault from "../../assets/images/cover_image_default.png";
import {
  Button,
  ProgressBar,
  Card,
  Row,
  Col,
  Form,
  Container,
} from "react-bootstrap";
import SuggestedProfileCardsWelcome from "../../components/organisms/profiles/suggestedProfileCardsWelcome";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";
import PageTemplate from "../templates/PageTemplate";
import professionalImage from "../../assets/images/find_professional.svg";
import knowledgeImage from "../../assets/images/knowledge-graphic.svg";
import "./_welcome-onboarding.scss";

const WelcomeeOnboarding = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const [profUrl, setProfUrl] = useState("");
  // const [covUrl, setCovUrl] = useState(coverImageDefault);
  const [profileFirstName, setProfileFirstName] = useState("");
  // const [profileLastName, setProfileLastName] = useState("");
  const [suggestedServiceProviders, setSuggestedServiceProviders] =
    useState(null);

  const [showProfprogress, setShowProfprogress] = useState(true);

  async function fetchData() {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const config: any = await headerConfig();

    await axios
      .get(`${USER_DATA_API}/UserProfile/${attributes.sub}`, config)
      .then((res: any) => {
        console.log(res.data);
        setProfileData(res.data.results[0][0]);
        setProfUrl(res.data.results[0][0].profilePhoto_url);
        // if (res.data.results[0][0].coverPhoto_url !== null) {
        //   setCovUrl(res.data.results[0][0].coverPhoto_url);
        // }
        setProfileFirstName(res.data.results[0][0].user_first_name);
        // setProfileLastName(res.data.results[0][0].user_last_name);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  async function searchDiscovers() {
    const { attributes } = await Auth.currentAuthenticatedUser();

    await axios
      .get(
        `https://22qzdzicjh.execute-api.us-east-1.amazonaws.com/dev/ServiceProviders/${attributes.sub}?page=1.25`
      )
      .then(async (res) => {
        setSuggestedServiceProviders(
          res.data.results.recommendations !== undefined &&
            Object.keys(res.data.results.recommendations).length === 0
            ? null
            : res.data.results.recommendations
        );
        console.log("response data 1 :", res.data.results.recommendations);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (profileData === null) {
      fetchData();
    }
  }, [profileData]);

  useEffect(() => {
    searchDiscovers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   if (profileData === null) {
  //     return <></>;
  //   }

  let progreess = 0;
  //   if (profileData.profilePhoto_url !== null) {
  //     progreess += 20;
  //   }
  //   if (profileData.coverPhoto_url !== null) {
  //     progreess += 20;
  //   }
  //   if (profileData.introduction_and_title.company !== null) {
  //     progreess += 20;
  //   }
  //   if (profileData.work_experinces !== null) {
  //     progreess += 20;
  //   }
  //   if (profileData.Interests !== null) {
  //     progreess += 20;
  //   }

  const navigator = useNavigate();

  return (
    <PageTemplate>
      <Container className="pt-4">
        <Card className="welcome-note mb-5">
          <Card.Body>
            <ProfileAvatar
              imageURL={profUrl || undefined}
              profileName={`Welcome ${profileFirstName}`}
            />
            <h5>Thank you for signing-up to Taxglobal</h5>
            <p>
              Here’s some of the recommended services providers based on your
              information.
            </p>
            <SuggestedProfileCardsWelcome
              suggestedServiceProviders={suggestedServiceProviders}
            />
          </Card.Body>
          <Card.Footer>
            <Button
              variant="link"
              onClick={() => {
                navigator("/discover/viewallsuggestions");
              }}
            >
              Click to see more <i className="fal fa-long-arrow-right"></i>
            </Button>
          </Card.Footer>
        </Card>
      </Container>

      {showProfprogress && (
        <ProfileProgress>
          <div className="step-progress">Step 1/2</div>
          <p>Complete your profile to to get most of Taxglobal</p>
          <div className="progress-view">
            <span className="text-mute">Progress ({`${progreess}%`})</span>
            <ProgressBar variant="dark" now={progreess} />
          </div>

          <div className="checkbox-list">
            <Form.Check
              inline
              label="Profile photo"
              name="group1"
              type="checkbox"
              id="profilePhoto"
              // checked={profileData.profilePhoto_url === null ? false : true}
              checked={false}
              readOnly
            />
            <Form.Check
              inline
              label="Cover photo"
              name="group1"
              type="checkbox"
              id="CoverPhoto"
              // checked={profileData.coverPhoto_url === null ? false : true}
              checked={false}
              readOnly
            />
            <Form.Check
              inline
              label="Introduction & title"
              name="group1"
              type="checkbox"
              id="IntroductionTitle"
              // checked={
              //   profileData.introduction_and_title.company === null ? false : true
              // }
              checked={false}
              readOnly
            />
            <Form.Check
              inline
              label="Work experience"
              name="group1"
              type="checkbox"
              id="WordExperience"
              // checked={profileData.work_experinces === null ? false : true}
              checked={false}
              readOnly
            />
            <Form.Check
              inline
              label="Interests"
              name="group1"
              type="checkbox"
              id="Interests"
              // checked={profileData.Interests === null ? false : true}
              checked={false}
              readOnly
            />
          </div>
          <div className="progress-action">
            <Button
              variant="dark"
              onClick={() => {
                navigator("/profile");
              }}
            >
              Continue
            </Button>
            <Button
              variant="link"
              onClick={() => {
                setShowProfprogress(false);
              }}
            >
              Hide for now
            </Button>
          </div>
        </ProfileProgress>
      )}

      <Container>
        <Row className="mb-5">
          <Col md="6">
            <Card
              className="text-block"
              onClick={() => {
                navigator("/discover");
              }}
              style={{ cursor: "pointer"  }}
            >
              <Card.Body>
                <img src={professionalImage} alt="" />
                <h3>Find professionals</h3>
                <p>
                  Our platform is designed to help users find the right
                  financial service providers quickly and easily. With our
                  advanced search and filter tools, users can easily narrow down
                  their options based on their specific needs and preferences.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card
              className="text-block"
              onClick={() => {
                navigator("/knowledge");
              }}
              style={{ cursor: "pointer"  }}
            >
              <Card.Body>
                <img src={knowledgeImage} alt="" />
                <h3>Knowledge Hub</h3>
                <p>
                  The resource for all things tax! Our goal is to provide a
                  comprehensive and user-friendly platform where you can find
                  all the learning material and resources you need to understand
                  and navigate the complex world of taxes.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md="12">
            <Card>
              <Card.Body>
                <h4>Browse by topics</h4>
                <div className="keyword-list">
                  <Chip
                    // bg="white"
                    // text="primary"
                    label="Business tax forms"
                    onClick={() => {
                      navigator(
                        "/discover/services/keyword/Business%20tax%20forms"
                      );
                    }}
                  />
                  <Chip
                    // bg="white"
                    // text="primary"
                    label="New business owner taxes"
                    onClick={() => {
                      navigator(
                        "/discover/services/keyword/New%20business%20owner%20taxes"
                      );
                    }}
                  />
                  <Chip
                    // bg="white"
                    // text="primary"
                    label="Increase your tax refunds"
                    onClick={() => {
                      navigator(
                        "/discover/services/keyword/Increase%20your%20tax%20refunds"
                      );
                    }}
                  />
                  <Chip
                    // bg="white"
                    // text="primary"
                    label="Overpaid taxes"
                    onClick={() => {
                      navigator("/discover/services/keyword/Overpaid%20taxes");
                    }}
                  />
                  <Chip
                    // bg="white"
                    // text="primary"
                    label="Small business taxes"
                    onClick={() => {
                      navigator(
                        "/discover/services/keyword/Small%20business%20taxes"
                      );
                    }}
                  />
                  <Chip
                    // bg="white"
                    // text="primary"
                    label="Reporting cryptocurrency on your taxes"
                    onClick={() => {
                      navigator(
                        "/discover/services/keyword/Reporting%20cryptocurrency%20on%20your%20taxes"
                      );
                    }}
                  />
                  <Chip
                    // bg="white"
                    // text="primary"
                    label="Tax in multiple states"
                    onClick={() => {
                      navigator(
                        "/discover/services/keyword/Tax%20in%20multiple%20states"
                      );
                    }}
                  />
                  <Chip
                    // bg="white"
                    // text="primary"
                    label="Patently for filing taxes late"
                    onClick={() => {
                      navigator(
                        "/discover/services/keyword/Patently%20for%20filing%20taxes%20late"
                      );
                    }}
                  />
                  <Chip
                    // bg="white"
                    // text="primary"
                    label="IRS negligence patently"
                    onClick={() => {
                      navigator(
                        "/discover/services/keyword/IRS%20negligence%20patently"
                      );
                    }}
                  />
                  <Chip
                    // bg="white"
                    // text="primary"
                    label="What is capitals gains tax"
                    onClick={() => {
                      navigator(
                        "/discover/services/keyword/What%20is%20capitals%20gains%20tax"
                      );
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PageTemplate>
  );
};

export default WelcomeeOnboarding;
