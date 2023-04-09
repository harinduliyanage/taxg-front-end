import React, { useEffect, useState } from "react";
import "./_reviews.scss";
import { Button, Col, Form, Modal, Row, Alert, Spinner } from "react-bootstrap";
// import Select from "react-select";
// import { CategoryOptions } from "../../../screens/entityPage/data";
// import IndustryOptions from "./IndustryOptions";
import axios from "axios";
import { ENTITY_KEY } from "../../../actions/keys";
import { EntityData } from "../../../interfaces/models/entity/EntityData";
import SearchUsers from "../../../components/organisms/entity/SearchUsers";
import EntityTeamItem from "./EntityTeamItem";
//import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Auth } from "aws-amplify";

// import { List, arrayMove } from "react-movable";
interface Props {
  data?: EntityData;
  teamList?: any;
  selectedIndustry?: any[];
  categoryList?: any[];
  render?: boolean;
  countryList?: any[];
  setRerender?: any;
  entityId?: number;
  ownerEntityRoleType?: number;
}
type TeamMember = {
  user_first_name: string;
  user_last_name: string;
  user_uuid: string;
};

const EntityTeam: React.FC<Props> = (props) => {
  const { data, teamList, render, setRerender, entityId, ownerEntityRoleType } =
    props;
  // const { teamData,teamMembers} = useState<EntityData>(data)
  //const [selectedMember, setSelectedMember] = useState<any>([]);
  const { user } = useSelector((root: any) => root.auth);
  //const { state } = useLocation();
  const [selectedMember, setSelectedMember] = useState<TeamMember[]>([]);
  const [show, setShow] = useState(false);
  const [showInvi, setShowInvi] = useState(false);
  const [showAddTeamError, setShowAddTeamError] = useState<any>(false);
  const [team2, setTeam2] = React.useState([]);
  const [previousOwner, setPreviousOwner] = React.useState();
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow(false);
  const [loadingForUsers, selLoadingForUsers] = useState(false);

  const [memberInOtherEntities, setMemberInOtherEntities] = useState(0);
  const [sendEmailObj, setSendEmailObj] = useState([
    {
      inviteeEmail: "",
      inviteeName: "",
    },
  ]);
  const handleShow = () => {
    setShow(true);
    setShowAddTeamError(false);
    setSelectedMember([]);
  };
  useEffect(() => {
    setTeam2(teamList);
    findOwner(teamList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  useEffect(() => {
    findOwner(teamList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousOwner]);

  const findOwner = (teamList: any[]) => {
    let userOwner = team2.find((e: any) => e.teamRoleTypeID === 3);
    setPreviousOwner(userOwner);
  };
  const addNewMember = async () => {
    let memberObj = Object.assign(selectedMember);
    console.log("sendEmailObj", sendEmailObj);
    if (memberInOtherEntities >= 5) {
      return;
    }
    const config = {
      Accept: "application/json",
      "x-api-key": ENTITY_KEY,
    };
    const data = {
      entityID: entityId,
      memberMapping: [
        {
          status: 1,
          uuid: memberObj.user_uuid,
          teamRoleTypeID: user.role_type_id === 1 ? 1 : 0,
          sortOrderNumber: 1,
          showInTeam: 0,
        },
      ],
    };
    if (selectedMember.length !== 0 && selectedMember !== undefined) {
      setShow(false);
      await axios
        .post(
          "https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/EntityTeam",
          data,
          { headers: config }
        )
        .then((res: any) => {
          setRerender(false);
          if (res.status === 200) {
            setSelectedMember([]);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      setShowAddTeamError(true);
    }
  };

  const sendInvite = async () => {
    setShowInvi(false)
    const { attributes } = await Auth.currentAuthenticatedUser();
    const uuid = attributes.sub;
    const body = {
      inviterUUId: uuid,
      inviteeDetails: sendEmailObj,
    };

    //const config = await headerConfig();
    let result = await axios.post(
      "https://wt7a040gw3.execute-api.us-east-1.amazonaws.com/dev/ServiceProvideInviteBulk",
      body
    );
    console.log("first", result);
    if(result.data.statusCode === 200 ){
      setSendEmailObj([
        {
          inviteeEmail: "",
          inviteeName: "",
        },
      ]);
    }
  };

  const andAnotherInvitation = () => {
    setSendEmailObj([
      ...sendEmailObj,
      {
        inviteeEmail: "",
        inviteeName: "",
      },
    ]);
  };

  const handleEmailChangeText = (e: any, key: number) => {
    const invitationList = [...sendEmailObj];
    sendEmailObj[key]["inviteeEmail"] = e.target.value;
    setSendEmailObj(invitationList);
  };
  const handleNameChangeText = (e: any, key: number) => {
    const invitationList = [...sendEmailObj];
    sendEmailObj[key]["inviteeName"] = e.target.value;
    setSendEmailObj(invitationList);
  };
  return (
    <div className="team-tab">
      <div className="section-header">
        {(ownerEntityRoleType === 2 || ownerEntityRoleType === 3) && (
          <Button className="add-new" onClick={handleShow}>
            <i className="fal fa-plus" /> Add new team member
          </Button>
        )}

        {/*Add new member modal*/}
        <Modal
          className="add-team-member"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>
            {loadingForUsers && (
              <div className="loading-search">
                <Spinner animation="border" />
              </div>
            )}
            <h3>Add new team member</h3>
            <div className="search-form">
              <form action="">
                <Form.Group>
                  <SearchUsers
                    setSelectedMember={setSelectedMember}
                    setShowAddTeamError={setShowAddTeamError}
                    teamAlreadyIn={team2}
                    selLoadingForUsers={selLoadingForUsers}
                    setMemberInOtherEntities={setMemberInOtherEntities}
                    memberInOtherEntities={memberInOtherEntities}
                  />
                  {showAddTeamError && (
                    <Alert variant="danger" style={{ marginTop: "20px" }}>
                      <p style={{ margin: 0 }}>
                        If you cannot find the person you are looking for,
                        invite them to join Taxglobal.
                      </p>
                    </Alert>
                  )}
                </Form.Group>
              </form>
            </div>
            <Alert variant="light">
              <strong>Invite your team member.</strong>
              <p>
                If you cannot find the person you are looking for, invite them
                to join Taxglobal.
              </p>
              <Button
                variant="outline-light"
                size="sm"
                onClick={() => {
                  setShowInvi(!showInvi);
                  setShow(false);
                }}
                //disabled={true}
              >
                Invite
              </Button>
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="dark"
              onClick={addNewMember}
              disabled={memberInOtherEntities >= 5 ? true : false}
            >
              Add
            </Button>
            <Button variant="outline-light" onClick={handleClose2}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Invite Uswers */}
        <Modal className="add-team-member" show={showInvi} onHide={handleClose}>
          {/* closeButton */}

          <Modal.Body>
            <h3>Add new team member</h3>
            <div className="invite-members">
              <Row className="g-2">
                <Col md={6}>
                  <Form.Label>Email address</Form.Label>
                </Col>
                <Col md={6}>
                  <Form.Label>Name (Optional)</Form.Label>
                </Col>
              </Row>
              {sendEmailObj.map((e, key) => (
                <Row className="g-2" key={key}>
                  <Col md={6}>
                    <input
                      type="email"
                      onChange={(e: any) => handleEmailChangeText(e, key)}
                      value={sendEmailObj[key]["inviteeEmail"]}
                      className="form-control"
                      maxLength={100}
                    />
                  </Col>
                  <Col md={6}>
                    <input
                      type="text"
                      onChange={(e: any) => handleNameChangeText(e, key)}
                      value={sendEmailObj[key]["inviteeName"]}
                      className="form-control"
                      maxLength={50}
                    />
                  </Col>
                </Row>
              ))}

              <Row>
                <Col>
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={() => andAnotherInvitation()}
                  >
                    <i className="fal fa-plus" /> Add another
                  </Button>
                </Col>
              </Row>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="dark"
              onClick={() => {
                sendInvite();
              }}
            >
              Send Invites
            </Button>

            <Button variant="outline-light" onClick={() => setShowInvi(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        {/* End */}
      </div>
      {team2.map((e: any, key) => (
        <div className="team-wrapper" key={key}>
          <EntityTeamItem
            key={key}
            itemId={e.teamMemberID}
            showTeam={e.showInTeam}
            memberName={e.name}
            imageURL={e.userProfileImage}
            teamRoleTypeID={e.teamRoleTypeID}
            enityName={data?.commonEntityDetails.entityName}
            setRerender={setRerender}
            uuID={e.uuid}
            previousOwner={previousOwner}
            updatedTeamList={team2}
            ownerEntityRoleType={ownerEntityRoleType}
          />
        </div>
      ))}
    </div>
  );
};

export default EntityTeam;
