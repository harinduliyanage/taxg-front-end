import React, { useState } from "react";
import "./_reviews.scss";
import { Button, ButtonGroup, Form, Modal } from "react-bootstrap";
import ReviewAvatar from "../cards/ReviewAvatar";
import Rating from "@mui/material/Rating";
import { ENTITY_KEY } from "../../../actions/keys";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import EntityLogo from "../cards/EntityLogo";
interface EntityReviewsProps {
  reviewsData?: Review[];
  entityData?: any;
  categoryList?: any;
  setRerender?: any;
}

type Review = {
  reviewID: number;
  reviewRating: number;
  reviewComment: string;
  reviewerProImage: string;
  reviewerFirstName: string;
  reviewerLastName: string;
  reviewerTitle: string;
  reviewerCompany: string;
};

export const EntityReviews: React.FC<EntityReviewsProps> = (props) => {
  const { reviewsData, entityData, categoryList, setRerender } = props;
  const { user } = useSelector((root: any) => root.auth);
  const [showModal, setShowModal] = useState(false);
  const [emptypost, setemptypost] = useState(true);
  const [rating, setRating] = useState(2);
  const [post, setPost] = useState("");
  const { state } = useLocation();
  const handleClose = () => {
    setShowModal(false);
    setPost("");
  };
  const handleShow = () => {
    setShowModal(true);
    setemptypost(false);
  };

  const categeory = () => {
    let catName = "";
    categoryList.forEach((val: any, key: number) => {
      if (val.id === entityData?.categoryID) {
        catName = val.name;
      }
    });
    return catName;
  };
  const handlePostChange = (e: any) => {
    setPost(e.target.value);
    setemptypost(false);
  };
  const submitRevidw = () => {
    setShowModal(false);
    const config = {
      Accept: "application/json",
      "x-api-key": ENTITY_KEY,
    };
    const postData = {
      entityID: state.entityId,
      Reviews: [
        {
          reviewerUUID: user.user_uuid,
          reviewRating: rating,
          reviewComment: post.toString(),
        },
      ],
    };
    if (post !== "") {
      setemptypost(false);
      axios
        .post(
          "https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/EntityReviews",
          postData,
          {
            headers: config,
          }
        )
        .then((res) => {
          //alert(res.data.message);
          if (res.status === 200) {
            setShowModal(false);
            setPost("");
            setRerender(false);
          }
        })
        .catch((e) => console.log("Error", e));
    } else {
      setemptypost(true);
    }
  };
  return (
    <>
      <div className="reviews-section">
        <nav className="page-nav mb-3">
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => handleShow()}
          >
            <i className="fas fa-pencil" /> Write a review
          </Button>
          <span className="pagination ms-auto d-flex">
            <ButtonGroup aria-label="Basic example">
              <Button variant="outline-light" size="sm">
                <i className="fal fa-angle-left" />
              </Button>
              <Button variant="outline-light" size="sm">
                <i className="fal fa-angle-right" />
              </Button>
            </ButtonGroup>
          </span>
        </nav>

        <div className="review-list">
          {reviewsData
            ? reviewsData?.map((e, key) => (
                <div className="review-item" key={key}>
                  <ReviewAvatar
                    reviews={e.reviewRating}
                    profileName={e.reviewerFirstName + " " + e.reviewerLastName}
                    imageURL={e.reviewerProImage}
                  />
                  <blockquote>{e.reviewComment}</blockquote>
                </div>
              ))
            : "No Records"}
        </div>
      </div>
      <Modal
        // className="add-team-member"
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <h3>Add a review</h3>
          <div className="search-form">
            <EntityLogo
              EntityName={entityData?.entityName}
              tagline={categeory()}
              imageURL={entityData?.entityLogo}
            />
            <form action="">
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue: any) => {
                  setRating(newValue);
                }}
                style={{ color: "#007B5C" }}
              />
              <Form.Group
                className="form-group"
                controlId="entityValues.entityName"
              >
                <Form.Label>Share your experience</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  onChange={(e: any) => handlePostChange(e)}
                  className={emptypost ? "is-invalid" : ""}
                  maxLength={500}
                />
                {/* {errors.entityName && "First name is required"} */}
              </Form.Group>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={() => submitRevidw()}
            disabled={emptypost}
          >
            Post
          </Button>
          <Button variant="outline-light" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EntityReviews;
