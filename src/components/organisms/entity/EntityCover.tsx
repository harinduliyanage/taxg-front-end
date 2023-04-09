import React, { useEffect, useState } from "react";
import "./_reviews.scss";
import {
  Button,
  Col,
  Container,
  Dropdown,
  FloatingLabel,
  Form,
  Modal,
  ModalBody,
  Row,
} from "react-bootstrap";
import EntityLogo from "../cards/EntityLogo";
import chatIcon from "../../../assets/images/chat-major.svg";
import { CONNECTED_USERS_KEY, MASTER_DATA_KEY } from "../../../actions/keys";
import axios from "axios";
import { StreamChatGenerics } from "../../chat/types";
import { useSelector } from "react-redux";
import { useConnectUser } from "../../chat/hooks";
import { Auth } from "aws-amplify";
import { headerConfig } from "../../../actions/headers";

interface EntityCoverProps {
  industryList?: any;
  basicDetails?: {
    ownerUUId: string;
    entityName: string;
    urlSlug: string;
    webURL: string;
    focusIndustries: number[];
    categoryID: number;
    entityLogo: string;
    entityCoverPhoto: string;
    tagLine: string;
    acceptTerms: number;
    companyDescription: string;
    country: string;
    zipCode: any;
    city: string;
    state: string;
    phoneNumber: string;
  };
  reviews?: any;
}
export const EntityCover: React.FC<EntityCoverProps> = ({
  reviews,
  basicDetails,
  industryList,
}) => {
  const [catList, setCatList] = useState([]);
  const [openMessageShowModal, setOpenMessageShowModal] = useState(false);
  const [textmessage, setMessage] = useState("");
  const [connected, setConnected] = useState(false);

  const { user } = useSelector((root: any) => root.auth);
  // const [catName, setCatName] = useState();
  useEffect(() => {
    fetchData();
    async function checkConnected() {
      const { attributes } = await Auth.currentAuthenticatedUser();
      const config: any = await headerConfig();
      config.headers["x-api-key"] = CONNECTED_USERS_KEY;

      const body = {
        loggedUuid: attributes.sub,
        ownerUuid: basicDetails?.ownerUUId,
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
    checkConnected();
  }, [basicDetails]);

  const chatClient = useConnectUser<StreamChatGenerics>("zv5mjghce2fa", user);

  const creatChannelAndSendMsg = async () => {
    //connect user
    //get basic user details api
    let sendUserStreamId = null;
    await axios
      .get(
        `https://4rivhcrxyg.execute-api.us-east-1.amazonaws.com/dev/BasicUserDetails/${basicDetails?.ownerUUId}`
      )
      .then((res12) => {
        console.log("test getStreamUserID", res12.data.results);
        sendUserStreamId = res12.data.results[0].get_stream_user_id;
      })
      .catch((err) => {
        console.log(err);
      });

    // create channel for the user
    let conversation = null;
    console.log(basicDetails);
    if (chatClient) {
      conversation = chatClient.channel("messaging", {
        members: [sendUserStreamId, user.get_stream_user_id],
      });
      await conversation.create();

      await conversation.sendMessage({
        text: textmessage,
      });

      setOpenMessageShowModal(false);
      setMessage("");

      // swal("Message Send Successfully",{
      // 	icon:"success",
      // });
    }
    //send message to the user
  };

  let reviewRatingCount = 0;
  let reviewVal: any;

  const connectUser = async () => {
    // const { attributes } = await Auth.currentAuthenticatedUser();
    const config: any = await headerConfig();
    const body = {
      connecteduserId: basicDetails?.ownerUUId,
      uuid: user.user_uuid,
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

  async function fetchData() {
    const config = {
      Accept: "application/json",
      "x-api-key": MASTER_DATA_KEY,
    };

    await axios
      .post(
        "https://c0kpyvjdm1.execute-api.us-east-1.amazonaws.com/dev/retrieveTableData",
        {
          type: "ENTITY_CATEGORY",
        },
        { headers: config }
      )
      .then((res: any) => {
        console.log("setCatList", res.data);
        setCatList(res.data.results);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  const industriesUI = () => {
    let catName = "";
    catList.forEach((val: any, key: number) => {
      if (val.id === basicDetails?.categoryID) {
        catName = val.name;
      }
    });
    if (reviews) {
      reviews.forEach((x: any) => (reviewRatingCount += x.reviewRating));
      reviewVal = reviewRatingCount / reviews.length;
      console.log("success : ", reviewRatingCount);
    }

    return (
      <>
        <EntityLogo
          EntityName={basicDetails?.entityName}
          tagline={catName}
          reviews={reviewVal}
          imageURL={basicDetails?.entityLogo}
        />
      </>
    );
  };

  return (
    <>
      {/* <>{console.log("reviews :", reviewRatingCount)}</> */}
      <Modal className="send-message" show={openMessageShowModal} centered>
        <ModalBody>
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
              onChange={(e: any) => setMessage(e.target.value)}
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

      <Container fluid className="entity-preview px-0">
        <div className="entity-cover-image">
          <img
            src={basicDetails?.entityCoverPhoto}
            alt={basicDetails?.entityName}
          />
        </div>
        <Container>
          <Row>
            <Col md="8" className="offset-md-2">
              <div className="entity-wrapper">
                {industriesUI()}

                <div className="entity-actions">
                  {connected ? (
                    <Button
                      disabled={
                        window.location.pathname === "/entity/preview"
                          ? true
                          : false
                      }
                      variant="outline-light"
                      size="sm"
                      onClick={() => {
                        console.log("test click");
                        setOpenMessageShowModal(true);
                      }}
                    >
                      <img src={chatIcon} alt="testtttttttttttt" /> Send message
                    </Button>
                  ) : (
                    <Button
                      disabled={
                        window.location.pathname === "/entity/preview"
                          ? true
                          : false
                      }
                      variant="outline-light"
                      size="sm"
                      onClick={connectUser}
                    >
                      <i className="far fa-plus"></i> Follow
                    </Button>
                  )}
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-light"
                      id="dropdown-basic"
                    >
                      <i className="fas fa-caret-down"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Report</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default EntityCover;
