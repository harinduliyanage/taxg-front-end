import React, { useState } from "react";
import "./_reviews.scss";
import "./_team-carousel.scss";
import {
  Card,
  Col,
  Row,
  Tab,
  Tabs,
  Button,
} from "react-bootstrap";
import PersonCard from "../cards/PersonCard";
import EntityServices from "./EntityServices";
import EntityReviews from "./EntityReviews";
import { EntityData } from "../../../interfaces/models/entity/EntityData";


interface Props {
  data?: EntityData;
  industryList?: any;
  countryList?: any[];
  render?: any;
  categoryList?: any;
  setRerender?: any;
}
/*const flickityOptions = {
  initialIndex: 0,
  dragThreshold: 10,
  freeScroll: false,
  selectedAttraction: 0.01,
  friction: 0.15,
  contain: true,
  prevNextButtons: false,
  pageDots: false,
  adaptiveHeight: false,
  setGallerySize: true,
  resize: false,
  cellAlign: "left",
  groupCells: 3,
  percentPosition: false,
};
let flkty: any = null;*/
export const EntityDetails: React.FC<Props> = (props) => {
  const { data, industryList, countryList, categoryList, setRerender } = props;
  const [showUsers , setShowUsers] = useState(false)
  const [selectedCountryCheck, setSelectedCuntryCheck] = useState({
    id: "",
    country_name: "",
  });
  const IndustriesUI = () => {
    getSelectedCountry();
    let result: any = [];
    industryList.forEach(
      (val: any) =>
        data?.commonEntityDetails.focusIndustries.includes(val.id) &&
        result.push(val.description)
    );
    return result;
  };

  const getSelectedCountry = () => {
    setSelectedCuntryCheck(
      countryList?.find((e: any) => e.id === data?.commonEntityDetails.country)
    );
  };
  const address = () => {
    return (
      <>
        {data?.commonEntityDetails.city} {", "}
        {data?.commonEntityDetails.state} {", "}
        {data?.commonEntityDetails.zipCode} {""}
        {selectedCountryCheck?.country_name}
      </>
    );
  };

  // const FlickityNext = () => {
  //   flkty.next();
  // };
  // const FlickityPrev = () => {
  //   flkty.previous();
  // };

  const loadMoreUsers = () => {
    setShowUsers(!showUsers)
  }
  return (
    <Tabs defaultActiveKey="EntityInfo" id="entity-tabs" className="mb-5">
      <Tab eventKey="EntityInfo" title="Information">
        <Card className="entity-card">
          <Card.Body>
            <h3>Introduction</h3>
            <p>{data?.commonEntityDetails.tagLine}</p>
          </Card.Body>
        </Card>
        <Card className="entity-card">
          <Card.Body>
            <h3>Industry focus </h3>
            <div
              className="details text-secondary w-50"
              style={{ textTransform: "capitalize" }}
            >
              <IndustriesUI />
              {}
            </div>
          </Card.Body>
        </Card>

        <Card className="entity-card">
          <Card.Body>
            <h3>Location</h3>
            <div className="details text-secondary w-50">{address()}</div>
          </Card.Body>
        </Card>

        <Row>
          <Col md="6">
            <Card className="entity-card">
              <Card.Body>
                <h3>Existing clients</h3>
                <div className="details-bold w-50">
                  {data?.serviceProviderEntityDetails.numberOfClients}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="entity-card">
              <Card.Body>
                <h3>Team size</h3>
                <div className="details-bold w-50">
                  {data?.serviceProviderEntityDetails.teamSize}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card className="entity-card">
              <Card.Body>
                <h3>IRS license number</h3>
                <div className="details-bold w-50">
                  {data?.serviceProviderEntityDetails.irsLicense}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="entity-card">
              <Card.Body>
                <h3>Date of establishment</h3>
                <div className="details-bold w-50">
                  {data?.serviceProviderEntityDetails.establishDate}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="entity-card">
          <Card.Body>
            <h3>Team</h3>

            <div className="team-carousel">
              <div className="flickity-viewport">
                <div className={!showUsers ? "flickity-slider" : "flickity-slider-nonFlow"}>
                {data?.teamMembers
                  ? data?.teamMembers.map(
                      (e, i) =>
                        e.teamMemberBasic.showInTeam === 1 && (
                          <div className="card-spacer card-details-m1">
                            <PersonCard
                              key={i}
                              profileName={
                                e.teamMemberDetails.userFirstName +
                                " " +
                                e.teamMemberDetails.userLastName
                              }
                              imageURL={e.teamMemberDetails.userProfileImage}
                              position={e.teamMemberDetails.userTitle}
                              summery={e.teamMemberDetails.userIntroduction}
                              userProfileURLSlug={
                                e.teamMemberDetails.userProfileURLSlug
                              }
                            />
                          </div>
                        )
                    )
                  : "No Data"}
                  </div>
              </div>
               <div style={{ display: "block", flexDirection:'column', textAlign:'center'}}>
               <Button variant="link"  onClick={() => loadMoreUsers()}>
               <i className={`${!showUsers? "fal fa-chevron-down":"fal fa-chevron-up"}`}></i>
											<span className="count">{!showUsers ? "Load More": "Hide"}</span>
										</Button> 
               </div>
                             
              {/* <div className="carousel-navigation">
                <div className="ms-auto me-0">
                  <ButtonGroup aria-label="flickityNav">
                    <Button variant="outline-light" onClick={FlickityPrev}>
                      <i className="fal fa-chevron-left"></i>
                    </Button>
                    <Button variant="outline-light" onClick={FlickityNext}>
                      <i className="fal fa-chevron-right"></i>
                    </Button>
                  </ButtonGroup>
                </div>
              </div> */}
            </div>
          </Card.Body>
        </Card>
      </Tab>
      <Tab eventKey="EntityServices" title="Services">
        <Card className="profile-card">
          <Card.Body>
            <EntityServices servicesData={data?.services} />
          </Card.Body>
        </Card>
      </Tab>
      <Tab eventKey="EntityReviews" title="Reviews">
        <Card className="profile-card">
          <Card.Body>
            <EntityReviews
              reviewsData={data?.reviews}
              entityData={data?.commonEntityDetails}
              categoryList={categoryList}
              setRerender={setRerender}
            />
          </Card.Body>
        </Card>
        {/* Edit Services */}
      </Tab>
    </Tabs>
  );
};

export default EntityDetails;
