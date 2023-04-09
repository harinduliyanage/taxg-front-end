import { FC } from "react";
import "./_profile-card.scss";
import avatar from "../../../assets/images/avatar-default.svg";
import { Rating} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
interface ReviewAvatarProps {
  imageURL?: string;
  profileName?: string;
  reviews?: number;
}

const ReviewAvatar: FC<ReviewAvatarProps> = ({
    imageURL,
    profileName,
    reviews,
}) => {
  return (
    <>
      <div className="profile-card">
        <span className="profile-avatar">
          <img
            className="profile-avatar-img"
            src={imageURL}
            alt={profileName}
          />
        </span>

        <span className="profile-details">
          {profileName && <h6>{profileName}</h6>}

          {reviews && (
              <Rating
                  className="stars"
                  name="text-feedback"
                  value={reviews}
                  readOnly
                  precision={0.5}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
          )}
        </span>
      </div>
    </>
  );
};

ReviewAvatar.defaultProps = {
  imageURL: avatar,
};

export default ReviewAvatar;
