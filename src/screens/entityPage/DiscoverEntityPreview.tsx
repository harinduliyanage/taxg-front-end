import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Tab } from "react-bootstrap";
import "./_entity-preview.scss";
import PageTemplate from "../templates/PageTemplate";
import EntityCover from "../../components/organisms/entity/EntityCover";
import EntityDetails from "../../components/organisms/entity/EntityDetails";
import { ENTITY_KEY } from "../../actions/keys";
import axios from "axios";
import { EntityData } from "../../interfaces/models/entity/EntityData";
import { MASTER_DATA_KEY } from "../../actions/keys";
//import { useSelector } from "react-redux";
import Loading from "../../components/organisms/loadingGif";
import { useLocation } from "react-router-dom";

const DiscoverEntityPreview = () => {
  //const entityID = useParams<any>();
  const { state } = useLocation();
  const [fullEntityDetail, setFullEntityDetails] = useState<EntityData>();
  //const [team, setTeam] = React.useState<any>([]);
  const [industryList, setIndustryList] = useState([]);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [countryList, setCountryList] = useState<any>([]);
  const [render, setRerender] = useState<boolean>(true);
 // const [selectedIndustry] = React.useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  //const [ownerEntityRoleType, setOwnerEntityRoleType] = useState();

  useEffect(() => {
    setLoading(true);
    updateEnitiy(state.entityId);
    //selectedIndustries();
    //setTeamMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setLoading(true);
    updateEnitiy(state.entityId);
    //selectedIndustries();
    //setTeamMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);
  async function updateEnitiy(entityID: any) {
    
    const config = {
      Accept: "application/json",
      "x-api-key": ENTITY_KEY,
    };

    const configMaster = {
      Accept: "application/json",
      "x-api-key": MASTER_DATA_KEY,
    };
    if (industryList.length === 0) {
      await axios
        .post(
          "https://c0kpyvjdm1.execute-api.us-east-1.amazonaws.com/dev/retrieveTableData",
          {
            type: "FOCUS_INDUSTRIES",
          },
          { headers: configMaster }
        )
        .then((res: any) => {
          //console.log("FOCUS_INDUSTRIES", res.data);
          setIndustryList(res.data.results);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
    if (categoryList.length === 0) {
      axios
        .post(
          "https://c0kpyvjdm1.execute-api.us-east-1.amazonaws.com/dev/retrieveTableData",
          {
            type: "ENTITY_CATEGORY",
          },
          { headers: configMaster }
        )
        .then((res: any) => {
          //console.log("ENTITY_CATEGORY", res.data);
          setCategoryList(res.data.results);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
    if (countryList.length === 0) {
      await axios
        .post(
          "https://c0kpyvjdm1.execute-api.us-east-1.amazonaws.com/dev/retrieveTableData",
          {
            type: "COUNTRY",
          },
          { headers: configMaster }
        )
        .then((res: any) => {
          //console.log("COUNTRY", res.data);
          setCountryList(res.data.results);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
    await axios
      .get(
        `https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/Entity/${state.entityId}`,
        { headers: config }
      )
      .then((res: any) => {
        console.log("Retrieving latest Entity", res.data);
        setFullEntityDetails(res.data.results);
        //setOwnerEntityRoleType(res.data.results.teamMembers[0].teamMemberBasic.teamRoleTypeID)
        if (res.status === 200) {
          setRerender(true);
          setLoading(false);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
/*
  const selectedIndustries = () => {
    industryList.forEach(
      (val: any, key: any) =>
        fullEntityDetail?.commonEntityDetails.focusIndustries.includes(
          val.id
        ) && selectedIndustry.push({ id: val.id, name: val.description })
    );
  };
  const setTeamMember = () => {
    setTeam([]);
    fullEntityDetail?.teamMembers &&
      fullEntityDetail?.teamMembers.forEach((val, i) => {
        team.push({
          name:
            val.teamMemberDetails.userFirstName +
            " " +
            val.teamMemberDetails.userLastName,
          status: val.teamMemberBasic.status,
          teamMemberID: val.teamMemberBasic.teamMemberID,
          uuid: val.teamMemberBasic.uuid,
          teamRoleTypeID: val.teamMemberBasic.teamRoleTypeID,
          sortOrderNumber: val.teamMemberBasic.sortOrderNumber,
          showInTeam: val.teamMemberBasic.showInTeam,
          userProfileImage: val.teamMemberDetails.userProfileImage,
        });
      });
  };
*/
 

  return (
    <>
    
    <PageTemplate>
      <section className="edit-entity">
        <Row className="py-4">
          {/* <div style={{ marginBottom: "20px" }}>
            <a className="btn btn-link back-btn" href="/entity">
              <i className="fal fa-long-arrow-left"></i> Go Back
            </a>
          </div> */}
          <Tab.Container id="entityEdit" defaultActiveKey="preview">
            <Tab.Content>
              <Tab.Pane eventKey="preview">
                <Card className="preview-cover">
                  <Card.Body className="p-0">
                    <EntityCover
                      basicDetails={fullEntityDetail?.commonEntityDetails}
                      industryList={industryList}
                    />
                  </Card.Body>
                </Card>
                <Container className="tab-view-container-entity">
                  <Row>
                    <Col md="8" className="offset-md-2">
                      <EntityDetails
                        data={fullEntityDetail}
                        industryList={industryList}
                        countryList={countryList}
                        render={render}
                        categoryList={categoryList}
                        setRerender={setRerender}
                      />
                    </Col>
                  </Row>
                </Container>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Row>
      </section>
      {loading && <Loading />}
    </PageTemplate>
    </>
  );
};

export default DiscoverEntityPreview;
