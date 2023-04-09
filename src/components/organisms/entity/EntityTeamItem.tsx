import React, { FC, useState } from "react";
import "./_team.scss";
import companyDefault from "../../../assets/images/company_default.svg";
import ProfileAvatar from "../cards/ProfileAvatar";
import { Button, Form, Modal } from "react-bootstrap";
// import { Select } from "@mui/material";
import { ENTITY_KEY } from "../../../actions/keys";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useSelector } from "react-redux";
interface EntityTeamProps {
  enityName?: string;
  itemId?: string;
  imageURL?: string;
  memberName?: string;
  showTeam?: boolean;
  menu?: string;
  teamRoleTypeID?: number;
  children?: JSX.Element | JSX.Element[];
  setRerender?: any;
  uuID?: string;
  entityRoleType?: number;
  previousOwner?: any;
  updatedTeamList?: any;
  ownerEntityRoleType?:any;
}

const EntityTeamItem: FC<EntityTeamProps> = ({
  itemId,
  imageURL,
  memberName,
  showTeam,
  teamRoleTypeID,
  enityName,
  setRerender,
  uuID,
  previousOwner,
  updatedTeamList,
  ownerEntityRoleType
}) => {
  let data = {};
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((root: any) => root.auth);
  const { state } = useLocation();

  const owenerObjupdated = Object.assign(
    updatedTeamList.filter((e: any) => e.uuid === state.loggedUSerUUI)
  );
  const loggedUserRoleType = ownerEntityRoleType;
  const removeTeamMember = (id: any) => {
    const config = {
      Accept: "application/json",
      "x-api-key": ENTITY_KEY,
    };
    const data = {
      entityID: state.entityId,
      memberMapping: [
        {
          status: 3,
          teamMemberID: id,
          uuid: uuID,
          teamRoleTypeID: teamRoleTypeID,
          sortOrderNumber: 1,
          showInTeam: showTeam,
        },
      ],
    };
    axios
      .post(
        "https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/EntityTeam",
        data,
        {
          headers: config,
        }
      )
      .then((res: any) => {
        setRerender(false);
        setIsOpen(false);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const updateTeamMember = (id: any, isShowInTeam: any) => {
    const config = {
      Accept: "application/json",
      "x-api-key": ENTITY_KEY,
    };
    const data = {
      entityID: state.entityId,
      memberMapping: [
        {
          status: 2,
          teamMemberID: id,
          uuid: uuID,
          teamRoleTypeID: teamRoleTypeID,
          // teamRoleTypeID:1,
          sortOrderNumber: 1,
          showInTeam: isShowInTeam ? 1 : 0,
        },
      ],
    };
    axios
      .post(
        "https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/EntityTeam",
        data,
        {
          headers: config,
        }
      )
      .then((res: any) => {
        setRerender(false); //TAX-947: Fixed
        setIsOpen(false);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const updateUserRole = async (
    id: any,
    teamRoleTypeID: any,
    previousOwner: any,
    uuID: any
  ) => {
    const { attributes } = await Auth.currentAuthenticatedUser();

    /*console.log("id",id)
    console.log("previousOwner",previousOwner)
    console.log("teamRoleTypeID",teamRoleTypeID)
    console.log("LoggedUser_entityRoleType",state.entityRoleType)
    console.log("state.entityId",state.entityId)
    console.log("uuID",uuID)
    */
    const config = {
      Accept: "application/json",
      "x-api-key": ENTITY_KEY,
    };
    if (attributes.sub === uuID) {
       //alert("this is owner")
      if (
        loggedUserRoleType === 2 &&
        loggedUserRoleType !== 3 &&
        loggedUserRoleType !== 1 &&
        loggedUserRoleType !== 0
      ) {
        data = {
          entityID: state.entityId,
          memberMapping: [
            {
              status: 2,
              teamMemberID: id,
              uuid: uuID,
              teamRoleTypeID: parseInt(teamRoleTypeID),
              sortOrderNumber: 1,
              showInTeam: showTeam,
            },
          ],
        };
      } else {
      }
    } else {
      //alert("this is Not owner"+loggedUserRoleType)
      if (loggedUserRoleType === 3 || loggedUserRoleType === 2) {
        if (
          teamRoleTypeID === "3" &&
          teamRoleTypeID !== "2" &&
          teamRoleTypeID !== "0" &&
          teamRoleTypeID !== "0"
        ) {
          data = {
            entityID: state.entityId,
            memberMapping: [
              {
                status: 2,
                teamMemberID: previousOwner.teamMemberID,
                uuid: previousOwner.uuid,
                teamRoleTypeID: 2,
                sortOrderNumber: 1,
                showInTeam: showTeam,
              },
              {
                status: 2,
                teamMemberID: id,
                uuid: uuID,
                teamRoleTypeID: parseInt(teamRoleTypeID),
                sortOrderNumber: 1,
                showInTeam: showTeam,
              },
            ],
          };
        } else {
          //alert("4")
          data = {
            entityID: state.entityId,
            memberMapping: [
              {
                status: 2,
                teamMemberID: id,
                uuid: uuID,
                teamRoleTypeID: parseInt(teamRoleTypeID),
                sortOrderNumber: 1,
                showInTeam: showTeam,
              },
            ],
          };
        }
      } else {
        //alert("3- You dont have rights to change role type")
      }
    }
    if (Object.keys(data).length !== 0) {
      await axios
        .post(
          "https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/EntityTeam",
          data,
          {
            headers: config,
          }
        )
        .then((res: any) => {
          setRerender(false);
          setIsOpen(false);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="entry-team-item">
        <ProfileAvatar profileName={memberName} imageURL={imageURL} />

        <form className="show-checkbox" action="">
          <Form.Check
            name="team[0]"
            defaultChecked={showTeam}
            id={itemId}
            type="checkbox"
            label="Show in team"
            //checked={showTeam}
            onChange={(e) => updateTeamMember(itemId, e.target.checked)}
            disabled={teamRoleTypeID === 3 ? true : false} //disable for testing
          />
        </form>
        <div className="item-action">
          {}
          <select
            className="form-select"
            value={teamRoleTypeID}
            disabled={
              teamRoleTypeID === 3 || owenerObjupdated[0]?.uuid === uuID
                ? true
                : false
            }
            onChange={(e) =>
              updateUserRole(itemId, e.target.value, previousOwner, uuID)
            }
          >
            <option
              value="3"
              disabled={loggedUserRoleType !== 3 ? true : false}
            >
              Owner
            </option>

            <option value="2">Administrator</option>
            {user.role_type_id === 1 ? (
              <option value="1">Team</option>
            ) : (
              <option value="0">Moderator</option>
            )}
          </select>
          <Button
            variant="outline-danger"
            onClick={() => setIsOpen(true)}
            disabled={teamRoleTypeID === 3 ? true : false}
          >
            Remove
          </Button>
        </div>
      </div>
      <Modal
        show={isOpen}
        //onHide={isOpen}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Body>
          <div className="form-layout">
            <h3>Are you sure?</h3>
            <p style={{ margin: 0, padding: 0 }}>
              You are about to remove {memberName} from {enityName} entity. This
              action cannot be undone. Press Cancel to go back.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => removeTeamMember(itemId)}>
            Remove
          </Button>
          <Button variant="outline-light" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

EntityTeamItem.defaultProps = {
  imageURL: companyDefault,
  showTeam: false,
};

export default EntityTeamItem;
