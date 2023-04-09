import { FC } from "react";
import "./_person-card.scss";
import avatar from "../../../assets/images/avatar-default.svg";
import { Card } from "react-bootstrap";
interface PersonCardProps {
  imageURL?: string;
  profileName?: string;
  position?: string;
  summery?: string;
  userProfileURLSlug?: string;
}

const PersonCard: FC<PersonCardProps> = ({
  imageURL,
  profileName,
  position,
  summery,
  userProfileURLSlug,
}) => {
  return (
    <Card
      className="person-card"
      onClick={() => (window.location.href = `/profile/${userProfileURLSlug}`)}
    >
      <Card.Body>
        <span className="person-avatar">
          <img
            className="person-avatar-img"
            src={imageURL ? imageURL : avatar}
            alt={profileName}
          />
        </span>

        <span className="person-details">
          {profileName && (
            <h6>
              {profileName.length > 14
                ? profileName.substring(0, 14) + "..."
                : profileName}
            </h6>
          )}
          {position && <div className="role">{position}</div>}
          {summery && (
            <div className="summery">
              {summery.length > 50 ? summery.substring(0, 50) + "..." : summery}
            </div>
          )}
        </span>
      </Card.Body>
    </Card>
  );
};

PersonCard.defaultProps = {
  imageURL: avatar,
};

export default PersonCard;
