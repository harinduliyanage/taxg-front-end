import { Avatar } from "@mui/material";
import React from "react";
import BasicRating from "../ratingsPanel";
import "./_profileRatingCard.scss";
function ProfileRatingCard({ data }) {
  return (
    <div>
      {data !== null ? (
        data.map((taxAdviser) => {
          return (
            <div className="row profile-rating g-0">
              <div className="col-3">
                <Avatar
                  alt="Remy Sharp"
                  src={taxAdviser.userProfileImage}
                  sx={{ width: 100, height: 100, marginRight: 0, padding: 0 }}
                />
              </div>
              <div className="col-9">
                <h2 className="profile__name">{taxAdviser.userFirstName}</h2>
                <h3 className="title">{taxAdviser.Title}</h3>
                <BasicRating />
                <p className="body">{taxAdviser.Introduction}</p>
              </div>
            </div>
          );
        })
      ) : (
        <>
          <p>No matches</p>
        </>
      )}
    </div>
  );
}

export default ProfileRatingCard;
