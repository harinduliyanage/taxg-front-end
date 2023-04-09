import { FC } from "react";
import "./_entity-logo.scss";
import avatar from "../../../assets/images/default_entity.svg";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
interface EntityLogoProps {
  imageURL?: string;
  EntityName?: string;
  tagline?: string;
  reviews?: number;
}

const EntityLogo: FC<EntityLogoProps> = ({
  imageURL,
  EntityName,
  tagline,
  reviews,
}) => {
  return (
    <>
      <div className="entity-card">
        <span className="entity-avatar">
          <img className="entity-avatar-img" src={imageURL} alt={EntityName} />
        </span>

        <span className="entity-details">
          {EntityName && <h6>{EntityName}</h6>}
          {tagline && <span className="role">{tagline}</span>}
          {reviews && (
            <div className="review">
              <span className="review-count">{reviews.toFixed(1)}</span>
              <span className="review-count">{0}</span>
              <Rating
                className="stars"
                name="text-feedback"
                value={reviews}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
            </div>
          )}
        </span>
      </div>
    </>
  );
};

EntityLogo.defaultProps = {
  imageURL: avatar,
};

export default EntityLogo;
