import { useState , useEffect } from "react";
import "./_card-carousel.scss";
import { Avatar , Rating } from "@mui/material";
import { StreamChat } from "stream-chat";
import axios from "axios";
import {
  Button,
  Card,
  Row,
  Col,
  Modal,
  Form,
  FloatingLabel,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { headerConfig } from "../../../actions/headers";

function ViewAllProfileCards({ matchingServiceProviders }) {
  const [openMessageShowModal, setOpenMessageShowModal] = useState(false);
  const { user } = useSelector((root) => root.auth);
  const [selectedUserData, setSelectedUserDatae] = useState();
  const [textmessage, setMessage] = useState("");
  const [sendMessageNotConnectedError, SetSendMessageNotConnectedError] =
    useState("");
    const [loading, setLoading] = useState(false);

  const sendMessage = async (sep) => {
    setOpenMessageShowModal(true);
    console.log("sep", sep);
    setSelectedUserDatae(sep);
  };

  const client = StreamChat.getInstance("zv5mjghce2fa");

  useEffect(() => {
    
    async function connectTOChat() {
      let chatUserToken = null;
      await axios
      .get(
        `https://pw08gp03ph.execute-api.us-east-1.amazonaws.com/dev/GenarateToken/${user.get_stream_user_id}`
      )
      .then((res1) => {
        chatUserToken = res1.data.results.token;
      })
      .catch((err) => {
        console.log(err);
      });

      await client.connectUser(
        {
          id: user.get_stream_user_id,
          name: `${user.user_first_name} ${user.user_last_name}`,
          image: user.profilePhoto_url,
          slug: user.user_slug
        },
        chatUserToken
      );
    }
    connectTOChat();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const creatChannelAndSendMsg = async () => {
    setLoading(true)
    //connect user
    const config = await headerConfig();
    const body = {
      connecteduserId: selectedUserData.providerUUId,
      uuid: user.user_uuid,
    };

    await axios
      .post(
        `https://h3u2h7j3fc.execute-api.us-east-1.amazonaws.com/dev/ConnectedUsers/save`,
        body,
        config
      )
      .then((res) => {
        // setConnected(true);
      })
      .catch((error) => {
        console.log(error);
      });
  
      let conversation = null;

      if (client && selectedUserData.streamID) {
        console.log(selectedUserData);
        conversation = client.channel("messaging", {
          members: [selectedUserData.streamID, user.get_stream_user_id],
        });
        await conversation.create();

        await conversation.sendMessage({
          text: textmessage,
        });

        setOpenMessageShowModal(false);
        setMessage("");
        SetSendMessageNotConnectedError("");
      } else {
        SetSendMessageNotConnectedError("This is old user");
      }
      setLoading(false)
  };

  const navigator = useNavigate();

  return (
    <>
      <Modal className="send-message" show={openMessageShowModal} centered>
        <Modal.Body>
        {loading ? 
        <div className="loading-search">
                    <Spinner animation="border" />
          </div>
          : ''}
          <h3 className="text-secondary">
            <i className="fal fa-comment-plus me-2"></i> Send Message
          </h3>
          <span style={{ color: "red" }}>{sendMessageNotConnectedError}</span>
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
        </Modal.Body>
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
              setMessage("");
              SetSendMessageNotConnectedError("");
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {matchingServiceProviders ? (
        matchingServiceProviders.map((serviceProvider) => {
          return (
            <>
              <Card className="profile-card-virticle">
                <Card.Body>
                  <Row>
                    <Col>
                      <div className="d-flex">
                        <Avatar
                          alt="Remy Sharp"
                          src={serviceProvider.profileImage}
                          sx={{
                            width: 100,
                            height: 100,
                            marginRight: 0,
                            padding: 0,
                          }}
                        />
                        <div className="user-details">
                          <h3 className="name">{`${serviceProvider.firstName} ${serviceProvider.lastName}`}</h3>
                          <span className="tagline">
                            {serviceProvider.title
                              ? serviceProvider.title
                              : "Profile tagline"}
                          </span>
                          <div className="user-rating">
                            <span className="rating-count">{Math.round(serviceProvider.providerRating)}/5</span>
                            <Rating
                              name="half-rating-read"
                              defaultValue={serviceProvider.providerRating}
                              precision={0.5}
                              size="small"
                              style={{ color: "#007B5C" }}
                              readOnly
                            />
                          </div>
                          <p className="details">
                            {serviceProvider.introduction}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col md="2" className="card-sidebar">
                      <Button
                        variant="outline-light"
                        size="sm"
                        onClick={() => {
                          navigator(
                            `../../profile/${serviceProvider.profileSlug}`
                          );
                        }}
                      >
                        View profile
                      </Button>
                      <Button
                        variant="outline-light"
                        size="sm"
                        onClick={() => {
                          sendMessage(serviceProvider);
                        }}
                      >
                        Send message
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </>
          );
        })
      ) : (
        <div>
          <p>No matches</p>
        </div>
      )}
    </>
  );
}

export default ViewAllProfileCards;
