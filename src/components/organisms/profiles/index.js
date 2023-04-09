import React, { useState, useEffect } from "react";
import "./_card-carousel.scss";
import { Avatar, Rating } from "@mui/material";
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
import { headerConfig } from "../../../actions/headers";
import { useSelector } from "react-redux";
import { StreamChat } from "stream-chat";
function ProfileCards({ matchingServiceProviders }) {
  const [openMessageShowModal, setOpenMessageShowModal] = useState(false);
  const { user } = useSelector((root) => root.auth);
  const [selectedUserData, setSelectedUserDatae] = useState();
  const [textmessage, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [sendMessageNotConnectedError, SetSendMessageNotConnectedError] =
    useState("");
  const navigator = useNavigate();
  const navigateToPreview = (entityID, entitySlug) => {
    let idArray = entityID.split(".", 2);
    navigator(`/entity/${entitySlug}`, {
      state: { entityId: idArray[0] },
    });
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
          slug: user.user_slug,
        },
        chatUserToken
      );
    }
    connectTOChat();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const sendMessage = async (sep) => {
    setOpenMessageShowModal(true);
    console.log("sep hear", sep);
    setSelectedUserDatae(sep);
  };

  const creatChannelAndSendMsg = async () => {
    setLoading(true);
    let idArray = selectedUserData.providerUUId.split(".", 2);
    const config = await headerConfig();
    const body = {
      connecteduserId: idArray[1],
      uuid: user.user_uuid,
    };
    let sendUserStreamId = null;
    await axios
      .get(
        `https://4rivhcrxyg.execute-api.us-east-1.amazonaws.com/dev/BasicUserDetails/${idArray[1]}`
      )
      .then((res12) => {
        console.log("test getStreamUserID", res12.data.results);

        sendUserStreamId = res12.data.results[0].get_stream_user_id;
        // setSendUserStreamId(res12.data.results[0].get_stream_user_id)
      })
      .catch((err) => {
        console.log(err);
      });

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

    // create channel for the user
    console.log(selectedUserData);
    let conversation = null;
    if (client && sendUserStreamId) {
      conversation = client.channel("messaging", {
        members: [sendUserStreamId, user.get_stream_user_id],
      });
      await conversation.create();

      await conversation.sendMessage({
        text: textmessage,
      });

      setOpenMessageShowModal(false);
      setMessage("");
      SetSendMessageNotConnectedError("");
    } else {
      SetSendMessageNotConnectedError("This is a old user");
    }
    setLoading(false);
  };

  return (
    <>
      <Modal className="send-message" show={openMessageShowModal} centered>
        <Modal.Body>
          {loading ? (
            <div className="loading-search">
              <Spinner animation="border" />
            </div>
          ) : (
            ""
          )}
          <h3 className="text-secondary">
            <i className="fal fa-comment-plus me-2"></i> Send Message <br />
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
                          src={serviceProvider.userProfileImage}
                          sx={{
                            width: 100,
                            height: 100,
                            marginRight: 0,
                            padding: 0,
                          }}
                        />
                        <div className="user-details">
                          <h3 className="name">
                            {`${serviceProvider.userFirstName} ${serviceProvider.userLastName}`}{" "}
                          </h3>
                          {/* <h3 className="name">{serviceProvider.Title} at <a style= {{color:"#34ed96",cursor:"pointer"}} onClick={() => {
                          navigator(
                            `../../entity/${serviceProvider.LinkedEntitySlug}`
                          );
                        }}> {serviceProvider.LinkedEntityName}</a></h3> */}
                          <span className="tagline">
                            {serviceProvider.Title !== "null" ? (
                              <>
                                {serviceProvider.Title}
                                {serviceProvider.LinkedEntityName !== "" ? (
                                  <>at</>
                                ) : (
                                  <></>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                            <span
                              onClick={() => {
                                navigateToPreview(
                                  serviceProvider.providerUUId,
                                  serviceProvider.LinkedEntitySlug
                                );
                              }}
                              style={{
                                cursor: "pointer",
                                color: "#1b696b",
                                textDecoration: "none",
                              }}
                            >
                              {" "}
                              {serviceProvider.LinkedEntityName}
                            </span>
                          </span>
                          <div className="user-rating">
                            <span className="rating-count">
                              {Math.round(serviceProvider.Rating / 20)}/5
                            </span>
                            <span className="rating-count">4/5</span>
                            <Rating
                              name="half-rating-read"
                              defaultValue={0}
                              precision={0.5}
                              size="small"
                              style={{ color: "#007B5C" }}
                              readOnly
                            />
                          </div>
                          <p className="details">
                            {serviceProvider.Introduction !== "null" &&
                              serviceProvider.Introduction}
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
                            `../../profile/${serviceProvider.userSlug}`
                          );
                        }}
                      >
                        View profile
                      </Button>
                      <Button
                        variant="outline-light"
                        size="sm"
                        onClick={() => sendMessage(serviceProvider)}
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

export default ProfileCards;
