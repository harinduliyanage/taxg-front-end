import { FC } from "react";
import "./_profile-card.scss";
import avatar from "../../../assets/images/avatar-default.svg";
import { useNavigate } from "react-router-dom";
interface ProfileAvatarFeedProps {
  suggestedServiceProviders?: any;
}

const ProfileAvatarFeed: FC<ProfileAvatarFeedProps> = ({
  suggestedServiceProviders,
}) => {
  const navigator = useNavigate();

  return (
    <>
      {suggestedServiceProviders !== null ? (
        suggestedServiceProviders.slice(0, 5).map((serviceProvider: any, i: number) => {
          return (
            <div
              key={i}
              className="profile-card"
              onClick={() => {
                navigator(`../../profile/${serviceProvider.profileSlug}`);
              }}
            >
              <span className="profile-avatar">
                <img
                  className="profile-avatar-img"
                  src={serviceProvider.profileImage || avatar}
                  alt={serviceProvider.firstName}
                />
              </span>

              <span className="profile-details">
                {serviceProvider.firstName && (
                  <h6>{serviceProvider.firstName}</h6>
                )}
                {serviceProvider.title && (
                  <span className="role">{serviceProvider.title}</span>
                )}
              </span>
            </div>
          );
        })
      ) : (
        <div>
          <p>No records</p>
        </div>
      )}
    </>
  );
};

// ProfileAvatar.defaultProps = {
//   imageURL: avatar,
// };

export default ProfileAvatarFeed;
