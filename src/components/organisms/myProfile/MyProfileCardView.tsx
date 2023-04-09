import { FC, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { ProfileData } from "../../../interfaces/models/ProfileData";

interface Props {
	profileData: ProfileData | null;
}

const MyProfileCardView: FC<Props> = (props) => {
	const [introduction, setIntroduction] = useState("");
	const { profileData } = props;

	useEffect(() => {
		if (profileData?.introduction_and_title.introduction) {
			setIntroduction(profileData?.introduction_and_title.introduction);
		}
	}, [profileData?.introduction_and_title.introduction]);

	return (
		<Card className="profile-card">
			<Card.Body>
				<div className="edit-widget">
					<h3>Introduction</h3>
				</div>
				<p>{introduction}</p>
			</Card.Body>
		</Card>
	);
};

export default MyProfileCardView;
