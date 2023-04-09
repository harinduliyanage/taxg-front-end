import React, { FC } from "react";
import "./_resource-card.scss";
import { Card } from "react-bootstrap";
import articleDefaultImage from "../../../assets/images/Cover-Photo.png";
interface ResourceItemProps {
  articleImage?: string;
  articleTitle?: string;
  articleSummery?: string;
  articleUrl?: string;
}

const ResourceItem: FC<ResourceItemProps> = ({
  articleImage,
  articleTitle,
  articleSummery,
  articleUrl,
}) => {
  return (
    <Card className="resource-item">
      <div className="resource-image">
        <img src={articleImage} alt="" />
      </div>
      <Card.Body>
        <h5>{articleTitle && articleTitle}</h5>
        <p>{articleSummery && articleSummery}</p>

        <a href={articleUrl} className="btn btn-outline-light btn-sm">
          View
        </a>
      </Card.Body>
    </Card>
  );
};

ResourceItem.defaultProps = {
  articleImage: articleDefaultImage,
};
export default ResourceItem;
