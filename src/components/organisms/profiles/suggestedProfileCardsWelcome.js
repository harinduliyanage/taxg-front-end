import "./_profile.scss";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProfileAvatar from "../cards/ProfileAvatar";
// import { lazyload } from "react-lazyload";

function SuggestedProfileCardsWelcome({ suggestedServiceProviders }) {
  const navigator = useNavigate();

  return (
    <Row className="row-cols-4 g-3 gy-3 cards-display">
      {/* {cards.map((c) => (
          <PeopleCard card={c} key={c.id}></PeopleCard>
        ))} */}

      {suggestedServiceProviders !== null ? (
        suggestedServiceProviders.slice(0, 4).map((serviceProvider) => {
          return (
            <Col md="3">
              <Button
                className="profile-item"
                variant="outline-light"
                onClick={() => {
                  navigator(`../../profile/${serviceProvider.profileSlug}`);
                }}
              >
                <ProfileAvatar
                  imageURL={serviceProvider.profileImage || undefined}
                  profileName={`${serviceProvider.firstName} ${serviceProvider.lastName}`}
                  position={serviceProvider.profileSlug}
                />
              </Button>
            </Col>
          );
        })
      ) : (
        <></>
      )}
    </Row>
  );
}

export default SuggestedProfileCardsWelcome;
