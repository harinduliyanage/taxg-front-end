import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import entityDefaultImage from "../../../assets/images/default_entity.svg";
interface MyEntityItemProps {
	itemId?: number,
	entityImage?: string;
	entityName?: string;
	entityDetails?: string;
	entityRoleType?: number;
	attributes?:string
}

export const MyEntityItem: React.FC<MyEntityItemProps> = ({ entityImage, entityName, entityDetails, itemId , entityRoleType,attributes}) => {
	const navigate = useNavigate();
	const navigateToPreview = (itemId:any,entityRoleType:any) => {
		console.log("Loading Entity ID",itemId)
			navigate(`/entity/preview`, {
			  state: { entityId: itemId , entityRoleType: entityRoleType, loggedUSerUUI : attributes },
			});
	}

	return (
		<Card className="my-entity" onClick={() => navigateToPreview(itemId , entityRoleType)}>
		<Card.Body>
			<div className="entity-logo">
				<img src={entityImage ? entityImage : entityDefaultImage} alt={entityName && entityName} />
			</div>
			{entityName && <h6>{entityName}</h6>}
			{entityDetails && <p>{entityDetails}</p>}
		</Card.Body>
	</Card>
	)

};

MyEntityItem.defaultProps = {
	entityImage: entityDefaultImage,
}
export default MyEntityItem;
