import Card from "react-bootstrap/Card";
import { FC } from "react";
import "./_card.scss";

interface PeopleCardProps {
	card: {
		imageURL: string;
		title: string;
		logoUrl: string;
		author: string;
		description: string;
		url: string;
	};
}

const PeopleCard: FC<PeopleCardProps> = ({
	card: { imageURL, title, logoUrl, author, description, url },
}) => {
	return (
		<div className="article-card">
			<Card>
				<a href={url}>
					<Card.Img variant="top" src={imageURL} />
					<Card.Body>
						<Card.Title>{title}</Card.Title>
						{/* <div className="author">
            <span className="avatar">{logoUrl}</span>
            <span className="name">{author}</span>
          </div> */}
						<Card.Text>{description}</Card.Text>
					</Card.Body>
				</a>
			</Card>
		</div>
	);
};

export default PeopleCard;
