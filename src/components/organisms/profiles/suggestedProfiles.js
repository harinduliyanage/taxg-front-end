import "./_profile.scss";
import { Avatar } from "@mui/material";
import { Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { lazyload } from "react-lazyload";

function SuggestedProfileCards({ suggestedServiceProviders }) {
  const navigator = useNavigate();

  return (
    <Row className="row-cols-1 row-cols-md-3 row-cols-lg-5 g-3 gy-3 cards-display mb-5">
      {/* {cards.map((c) => (
          <PeopleCard card={c} key={c.id}></PeopleCard>
        ))} */}

      {suggestedServiceProviders !== null ? (
        suggestedServiceProviders.map((serviceProvider) => {
          return (
            <Col className="d-flex">
              <Card
                className="propfile__card"
                onClick={() => {
                  navigator(`../../profile/${serviceProvider.profileSlug}`);
                }}
              >
                <Card.Body>
                  <div className="bg__color__profile">
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
                  </div>
                  <div className="profile__details">
                    <h3 className="name">{`${serviceProvider.firstName} ${serviceProvider.lastName}`}</h3>
                    <h3 className="title">{serviceProvider.profileSlug}</h3>
                    <h4 className="details">
                      {serviceProvider.introduction &&
                        serviceProvider.introduction.slice(0, 50)}
                    </h4>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })
      ) : (
        <>
          <p>No matches</p>
        </>
      )}
    </Row>
  );
}

export default SuggestedProfileCards;
