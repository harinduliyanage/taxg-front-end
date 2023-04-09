import { useEffect, useState } from "react";
import {
  Row,
  Container,
  Tab,
  Tabs,
  Card,
  Button,
  Dropdown,
  Modal,
  ModalBody,
  Col,
  Form,
  FloatingLabel,
  Spinner
} from "react-bootstrap";
import PageTemplate from "../templates/PageTemplate";
import coverImageDefault from "../../assets/images/cover_image_default.png";
import "./_my-profile.scss";
import ProfileAvatar from "../../components/organisms/cards/ProfileAvatar";
import { Auth } from "aws-amplify";
import axios from "axios";
import { headerConfig } from "../../actions/headers";
import { USER_DATA_API } from "../../actions/endPoints";
import { useParams } from "react-router-dom";
import MyProfileCardView from "../../components/organisms/myProfile/MyProfileCardView";
import ExperienceCardView from "../../components/organisms/myProfile/ExperienceCardView";
import CertificateCardView from "../../components/organisms/myProfile/CertificateCardView";
import ProfileServicesView from "../../components/organisms/myProfile/ProfileServicesView";
// import CropEasy from "../../components/organisms/crop/CropEasy";
// import chatIcon from "../../assets/images/chat-major.svg";
import { CONNECTED_USERS_KEY } from "../../actions/keys";
import { useSelector } from "react-redux";
import { useConnectUser } from "../../components/chat/hooks";
import { StreamChatGenerics } from "../../components/chat/types";

const UserProfile = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [profUrl, setProfUrl] = useState("");
  const [covUrl, setCovUrl] = useState(coverImageDefault);
  const [profileFirstName, setProfileFirstName] = useState("");
  const [profileLastName, setProfileLastName] = useState("");
  const [textmessage, setMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [openMessageShowModal, setOpenMessageShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((root: any) => root.auth);
  const { slug } = useParams();

  console.log(profileData);

  useEffect(() => {
    async function fetchData() {
      const config: any = await headerConfig();

      await axios
        .get(`${USER_DATA_API}/UserProfile/${slug}`, config)
        .then((res: any) => {
          setProfileData(res.data.results[0][0]);
          setProfUrl(res.data.results[0][0].profilePhoto_url);
          if (res.data.results[0][0].coverPhoto_url !== null) {
            setCovUrl(res.data.results[0][0].coverPhoto_url);
          }
          setProfileFirstName(res.data.results[0][0].user_first_name);
          setProfileLastName(res.data.results[0][0].user_last_name);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
    if (profileData === null) {
      fetchData();
    }
  }, [profileData, slug]);

  useEffect(() => {
    async function checkConnected() {
      const { attributes } = await Auth.currentAuthenticatedUser();
      const config: any = await headerConfig();
      config.headers["x-api-key"] = CONNECTED_USERS_KEY;

      const body = {
        loggedUuid: attributes.sub,
        ownerUuid: profileData?.user_uuid,
      };

      await axios
        .post(
          `https://5nrypedfug.execute-api.us-east-1.amazonaws.com/dev/check-user-connected`,
          body,
          config
        )
        .then((res: any) => {
          if (res.data.results.connected) {
            setConnected(true);
          } else {
            setConnected(false);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    }

    if (profileData?.user_uuid) {
      checkConnected();
    }
  }, [profileData?.user_uuid]);

  const connectUser = async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const config: any = await headerConfig();
    const body = {
      connecteduserId: profileData?.user_uuid,
      uuid: attributes.sub,
    };

    await axios
      .post(
        `https://h3u2h7j3fc.execute-api.us-east-1.amazonaws.com/dev/ConnectedUsers/save`,
        body,
        config
      )
      .then((res: any) => {
        setConnected(true);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const sendMessage = async () => {
    setOpenMessageShowModal(true);
  };

  const chatClient = useConnectUser<StreamChatGenerics>("zv5mjghce2fa", user);

  const creatChannelAndSendMsg = async () => {
    //connect user
    setLoading(true)
    // create channel for the user
    let conversation = null;
    console.log(profileData);
    if (chatClient) {
      conversation = chatClient.channel("messaging", {
        members: [profileData.get_stream_user_id, user.get_stream_user_id],
      });
      await conversation.create();

      await conversation.sendMessage({
        text: textmessage,
      });

      setOpenMessageShowModal(false);
      setMessage("");
      setLoading(false)
      // swal("Message Send Successfully",{
      // 	icon:"success",
      // });
    }
    //send message to the user
  };

  if (profileData === null) {
    return <></>;
  }

  return (
    <>
      <Modal className="send-message" show={openMessageShowModal} centered>
        <ModalBody>
        {loading ? 
        <div className="loading-search">
                    <Spinner animation="border" />
          </div>
          : ''}
          <h3 className="text-secondary">
            <i className="fal fa-comment-plus me-2"></i> Send Message
          </h3>

          <FloatingLabel
            controlId="messageField"
            label="Leave your message here"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a message here"
              style={{ height: "150px" }}
              value={textmessage}
              onChange={(e) => setMessage(e.target.value)}
            />
          </FloatingLabel>
        </ModalBody>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              creatChannelAndSendMsg();
            }}
          >
            <i className="fas fa-paper-plane"></i> Send Message
          </Button>
          <Button
            variant="outline-light"
            onClick={() => {
              setOpenMessageShowModal(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <PageTemplate>
        <Container fluid className="my-profile px-0">
          <div className="profile-cover-image">
            <img src={covUrl} alt="" />
          </div>
          <Container>
            <Row>
              <Col md="8" className="offset-md-2">
                <div className="profile-wrapper user-profile">
                  <ProfileAvatar
                    imageURL={profUrl || undefined}
                    profileName={`${profileFirstName} ${profileLastName}`}
                    position={profileData.profileData || ""}
                  />
                  <div className="profile-actions">
                    {connected ? (
                      <>
                        {/* <Button
                          variant="outline-light"
                          size="sm"
                          disabled={!connected}
                          onClick={sendMessage}
                        >
                          <img src={chatIcon} alt="" /> Message
                        </Button> */}
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="outline-light"
                            id="dropdown-basic"
                          >
                            <i className="fas fa-caret-down"></i>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">
                              {/* <i className="far fa-check"></i> */}
                              Connected
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#/action-1"
                              disabled={!connected}
                              onClick={sendMessage}
                            >
                              Send Message
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </>
                    ) : (
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="outline-light"
                          id="dropdown-basic"
                        >
                          <i className="fas fa-caret-down"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            href="#/action-1"
                            onClick={connectUser}
                          >
                            {/* <i className="far fa-check"></i> */}
                            Connect
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-1" disabled={!connected}>
                            Send Message
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      // <Button
                      //   variant="outline-light"
                      //   size="sm"
                      //   onClick={connectUser}
                      //   // disabled={connected}
                      // >
                      //   <i className="far fa-plus"></i> Connect
                      // </Button>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
        <Container className="tab-view-container">
          <Row>
            <Col md="8" className="offset-md-2">
              <Tabs
                defaultActiveKey="profileInfo"
                id="profile-tabs"
                className="mb-5"
              >
                <Tab eventKey="profileInfo" title="Information">
                  <MyProfileCardView profileData={profileData} />
                  <ExperienceCardView profileData={profileData} />
                  <CertificateCardView profileData={profileData} />
                </Tab>
                <Tab eventKey="profileServices" title="Services">
                  <Card className="profile-card">
                    <Card.Body>
                      <ProfileServicesView />
                    </Card.Body>
                  </Card>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </PageTemplate>
    </>
  );
};

export default UserProfile;
