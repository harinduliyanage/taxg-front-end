import { FC } from "react";
import "./_profile-card.scss";
import avatar from "../../../assets/images/default_entity.svg";
// import { useNavigate } from "react-router-dom";
import EntityDefaultImage from "../../../assets/images/clientsList.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
interface EntitySectionFeedProps {
  entities?: any;
}

const EntitySectionFeed: FC<EntitySectionFeedProps> = ({ entities }) => {
  const { user } = useSelector((root: any) => root.auth);
  const navigate = useNavigate();
  const navigateToPreview = (itemId: any, entityRoleType: any) => {
    //console.log("Loading Entity ID",itemId)
    navigate(`/entity/preview`, {
      state: {
        entityId: itemId,
        entityRoleType: entityRoleType,
        loggedUSerUUI: user.user_uuid,
      },
    });
  };
  return (
    <>
      {entities !== null ? (
        entities.slice(0, 3).map((entity: any, key: number) => {
          return (
            <div
              className="profile-card"
              onClick={() => {
                navigateToPreview(entity.entityId, entity.entityRoleType);
              }}
              key={key}
            >
              <span className="profile-avatar">
                <img
                  className="entity-logo"
                  src={entity.entityLogo || avatar}
                  alt={entity.entityName}
                />
              </span>

              <span className="profile-details">
                {entity.entityName && <h6>{entity.entityName}</h6>}
              </span>
            </div>
          );
        })
      ) : (
        <>
          <span className="entity-image">
            <img src={EntityDefaultImage} alt="" />
          </span>
        </>
      )}
    </>
  );
};

// ProfileAvatar.defaultProps = {
//   imageURL: avatar,
// };

export default EntitySectionFeed;
