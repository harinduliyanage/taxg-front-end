import { FC } from "react";
import "./_profile-card.scss";
import avatar from "../../../assets/images/avatar-default.svg";
interface ProfileAvatarProps {
  imageURL?: string;
  profileName?: string;
  position?: string;
}

const ProfileAvatar: FC<ProfileAvatarProps> = ({
  imageURL,
  profileName,
  position,
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
          {position && <span className="role">{position}</span>}
        </span>
      </div>
    </>
  );
};

ProfileAvatar.defaultProps = {
  imageURL: avatar,
};

export default ProfileAvatar;
