import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ENTITY_KEY } from "../../../actions/keys";
import Select from "react-select";
import { Alert } from "react-bootstrap";

interface EntityTeamProps {
  setSelectedMember?: any;
  teamAlreadyIn?: any;
  setShowAddTeamError?: any;
  memberInOtherEntities?: any;
  selLoadingForUsers?: any;
  setMemberInOtherEntities?: any;
}
type BusinessCodes = {
  label: number;
  value: string;
  code: string;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
};
const SearchUsers: FC<EntityTeamProps> = ({
  setSelectedMember,
  teamAlreadyIn,
  setShowAddTeamError,
  selLoadingForUsers,
  setMemberInOtherEntities,
  memberInOtherEntities,
}) => {
  const { user } = useSelector((root: any) => root.auth);
  const [useList, setUserList] = useState([]);
  useEffect(() => {
    loadOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadOptions = async () => {
    const configMaster = {
      Accept: "application/json",
      "x-api-key": ENTITY_KEY,
    };
    const response = await axios.get(
      `https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/RegisteredUsers/${user.role_type_id}`,
      { headers: configMaster }
    );

    const responseJSON = await response.data.results.userList;
    let usersWithoutSelected = responseJSON.filter((bo: any) =>
      teamAlreadyIn.every((ao: any) => ao.uuid !== bo.user_uuid)
    );
    setUserList(usersWithoutSelected);
  };
  const handleSearchUsers = (option: any) => {
    var valueAtIndex1 = Object.assign(useList[option.value]);
    console.log("valueAtIndex1", valueAtIndex1.user_uuid);
    setSelectedMember(valueAtIndex1);
    setShowAddTeamError(false);
    getEntityDetail(valueAtIndex1.user_uuid);
  };
  async function getEntityDetail(selectedUUID: any) {
    selLoadingForUsers(true);
    const configMaster = {
      Accept: "application/json",
      "x-api-key": ENTITY_KEY,
    };

    await axios
      .get(
        `https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/RegisteredEntities/${selectedUUID}`,
        { headers: configMaster }
      )
      .then((res: any) => {
        if (res.data.results.affiliatedEntities) {
          setMemberInOtherEntities(res.data.results.affiliatedEntities.length);
        } else {
          setMemberInOtherEntities(0);
        }
        selLoadingForUsers(false);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
  return (
    <>
      <Select
        placeholder="Search by name or email"
        options={
          useList &&
          useList.map((option: BusinessCodes, key: number) => ({
            value: key,
            label:
              option.user_first_name +
              " " +
              option.user_last_name +
              ", " +
              option.user_email,
          }))
        }
        onChange={(value: any) => handleSearchUsers(value)}
      ></Select>
      {memberInOtherEntities >= 5 && (
        <Alert variant="danger" className="mt-3">
          <p style={{ margin: 0 }}>
            This user has reached the maximum number of companies, hence he
            cannot be assigned to this company
          </p>
        </Alert>
      )}
    </>
  );
};

export default SearchUsers;
