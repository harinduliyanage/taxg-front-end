import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Tab, Button, Nav } from "react-bootstrap";
import "./_entity-preview.scss";
import PageTemplate from "../templates/PageTemplate";
import EntityCover from "../../components/organisms/entity/EntityCover";
import EntityDetails from "../../components/organisms/entity/EntityDetails";
import { ENTITY_KEY } from "../../actions/keys";
import axios from "axios";
import { EntityData } from "../../interfaces/models/entity/EntityData";
import { useLocation } from "react-router-dom";
import EditDetails from "../../components/organisms/entity/EditDetails";
import { MASTER_DATA_KEY } from "../../actions/keys";
import EntityTeam from "../../components/organisms/entity/EntityTeam";
import EntityServicList from "../../components/organisms/entity/EntityService";
import EntitySubscription from "../../components/organisms/entity/EntitySubscription";
import EntityDocumentList from "../../components/organisms/entity/EntityDocument";
import EntitySubscriptionDetails from "../../components/organisms/entity/EntitySubscriptionDetails";
import { useSelector } from "react-redux";
import Loading from "../../components/organisms/loadingGif";

const PreviewEntity = () => {
  const { state } = useLocation();
  const { user } = useSelector((root: any) => root.auth);
  const [fullEntityDetail, setFullEntityDetails] = useState<EntityData>();
  const [team, setTeam] = React.useState<any>([]);
  const [industryList, setIndustryList] = useState([]);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [countryList, setCountryList] = useState<any>([]);
  const [render, setRerender] = useState<boolean>(true);
  const [selectedIndustry] = React.useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [ownerEntityRoleType, setOwnerEntityRoleType] = useState();

  useEffect(() => {
    updateEnitiy();
    selectedIndustries();
    setTeamMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);
  useEffect(() => {
    getOwnerDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullEntityDetail]);
  async function updateEnitiy() {
    setLoading(true);
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
        // setReview(res.data.results?.reviews);
        //setOwnerEntityRoleType(res.data.results.teamMembers[0].teamMemberBasic.teamRoleTypeID)
        console.log("aaa :", res.data.results.reviews);

        if (res.status === 200) {
          setRerender(true);
          setLoading(false);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

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

  const getOwnerDetails = async () => {
    let owner: any = fullEntityDetail?.teamMembers.filter(
      (e) => e.teamMemberBasic.uuid === user.user_uuid
    );
    if (owner && owner.length > 0) {
      setOwnerEntityRoleType(owner[0]?.teamMemberBasic?.teamRoleTypeID);
    }
  };

  return (
    <PageTemplate>
      <section className="edit-entity">
        <Container className="py-4">
          <div style={{ marginBottom: "20px" }}>
            <a className="btn btn-link back-btn" href="/entity">
              <i className="fal fa-long-arrow-left"></i> Go Back
            </a>
          </div>
          <Tab.Container id="entityEdit" defaultActiveKey="preview">
            <Card className="full-page">
              <Card.Header>
                <span className="entity-logo">
                  <img
                    src={fullEntityDetail?.commonEntityDetails.entityLogo}
                    alt={fullEntityDetail?.commonEntityDetails.entityName}
                  />
                </span>
                {fullEntityDetail?.commonEntityDetails.entityName}
                {user.role_type_id === 1 && (
                  <Button variant="outline-light" disabled>
                    <i className="fas fa-address-card"></i> Customer portal
                  </Button>
                )}
              </Card.Header>
              <Card.Body>
                <Nav variant="pills" className="tab-navigation">
                  <Nav.Item>
                    <Nav.Link
                      eventKey="preview"
                      onClick={() => setRerender(!render)}
                    >
                      Preview
                    </Nav.Link>
                  </Nav.Item>
                  {(ownerEntityRoleType === 3 || ownerEntityRoleType === 2) && (
                    <Nav.Item>
                      <Nav.Link
                        eventKey="details"
                        onClick={() => setRerender(!render)}
                      >
                        Entity details
                      </Nav.Link>
                    </Nav.Item>
                  )}

                  {user.role_type_id === 2 &&
                    (ownerEntityRoleType === 3 ||
                      ownerEntityRoleType === 2) && (
                      <Nav.Item>
                        <Nav.Link
                          eventKey="document"
                          onClick={() => setRerender(!render)}
                        >
                          Documents
                        </Nav.Link>
                      </Nav.Item>
                    )}
                  {(ownerEntityRoleType === 3 || ownerEntityRoleType === 2) && (
                    <Nav.Item>
                      <Nav.Link
                        eventKey="team"
                        onClick={() => setRerender(!render)}
                      >
                        Team
                      </Nav.Link>
                    </Nav.Item>
                  )}
                  {(ownerEntityRoleType === 3 || ownerEntityRoleType === 2) && (
                    <Nav.Item>
                      <Nav.Link eventKey="services">Services</Nav.Link>
                    </Nav.Item>
                  )}

                  {(ownerEntityRoleType === 3 || ownerEntityRoleType === 2) && (
                    <Nav.Item>
                      <Nav.Link eventKey="subscription">Subscription</Nav.Link>
                    </Nav.Item>
                  )}
                </Nav>
              </Card.Body>
            </Card>
            <Tab.Content>
              <Tab.Pane eventKey="preview">
                <Card className="preview-cover">
                  <Card.Body className="p-0">
                    <EntityCover
                      basicDetails={fullEntityDetail?.commonEntityDetails}
                      reviews={fullEntityDetail?.reviews}
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
              <Tab.Pane eventKey="details">
                <Card>
                  <Card.Body>
                    <EditDetails
                      entityData={fullEntityDetail}
                      industryList={industryList}
                      //selectedIndustry={selectedIndustry}
                      render={render}
                      categoryList={categoryList}
                      countryList={countryList}
                      setRerender={setRerender}
                      entityId={state.entityId}
                    />
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="document">
                <Card>
                  <Card.Body>
                    <EntityDocumentList
                      data={fullEntityDetail}
                      setRerender={setRerender}
                      entityId={state.entityId}
                    />
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="team">
                <Card>
                  <Card.Body>
                    <EntityTeam
                      data={fullEntityDetail}
                      teamList={team}
                      render={render}
                      setRerender={setRerender}
                      entityId={state.entityId}
                      ownerEntityRoleType={ownerEntityRoleType}
                    />
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="services">
                <Card>
                  <Card.Body>
                    <EntityServicList
                      data={fullEntityDetail}
                      setRerender={setRerender}
                    />
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="subscription">
                {fullEntityDetail?.subscription ? (
                  <Card>
                    <Card.Body>
                      <EntitySubscriptionDetails
                        data={fullEntityDetail}
                        entityId={state.entityId}
                        setRerender={setRerender}
                        countryList={countryList}
                      />
                    </Card.Body>
                  </Card>
                ) : (
                  <EntitySubscription />
                )}
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </section>
      {loading && <Loading />}
    </PageTemplate>
  );
};

export default PreviewEntity;
