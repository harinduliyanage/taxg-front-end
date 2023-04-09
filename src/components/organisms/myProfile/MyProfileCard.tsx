import { Auth } from "aws-amplify";
import { FC, useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { headerConfig } from "../../../actions/headers";
import axios from "axios";
import { USER_DATA_API } from "../../../actions/endPoints";
import { ProfileData } from "../../../interfaces/models/ProfileData";

interface Props {
	profileData: ProfileData | null;
	getInformation: () => void;
}

const MyProfileCard: FC<Props> = (props) => {
	const [showIntroductionModal, setShowIntroductionModal] = useState(false);
	const [introduction, setIntroduction] = useState("");

	const { profileData, getInformation } = props;

	useEffect(() => {
		if (profileData?.introduction_and_title.introduction) {
			setIntroduction(profileData?.introduction_and_title.introduction);
		}
	}, [profileData?.introduction_and_title.introduction]);

	const handleAddIntroduction = () => setShowIntroductionModal(true);
	const handleClose = () => {
		setShowIntroductionModal(false);
	};

	const updateIntroduction = async () => {
		const { attributes } = await Auth.currentAuthenticatedUser();
		const uuid = attributes.sub;

		const body = {
			uuid: uuid,
			company: profileData?.introduction_and_title.company,
			industry: profileData?.introduction_and_title.industry_id,
			function: profileData?.introduction_and_title.function_id,
			yourTitle: profileData?.introduction_and_title.title,
			introduction: introduction,
		};

		const config: any = await headerConfig();

		axios
			.post(`${USER_DATA_API}/IntroductionAndTitle`, body, config)
			.then(() => {
				getInformation();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Card className="profile-card">
			<Card.Body>
				<div className="edit-widget">
					<h3>Introduction</h3>
					<Button
						variant="outline-light"
						size="sm"
						onClick={handleAddIntroduction}
					>
						<i className="fas fa-pencil" /> Edit
					</Button>
					<Modal show={showIntroductionModal}>
						<Modal.Body>
							<form id="editIntro">
								<div className="form-layout">
									<Modal.Title>Introduction</Modal.Title>
									{/* <input
										type="text"
										onChange={(e) => {
											setIntroduction(e.target.value);
										}}
										value={introduction || ""}
									/> */}
									<Row>
										<Form.Group as={Col}>
											{/* <Form.Label>Introduction</Form.Label> */}
											<Form.Control
												as="textarea"
												rows={6}
												onChange={(e) => {
													setIntroduction(e.target.value);
												}}
												name="introduction"
												id="introduction"
												value={introduction || ""}
											/>
										</Form.Group>
									</Row>
								</div>
							</form>
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant="dark"
								onClick={() => {
									updateIntroduction();
									setShowIntroductionModal(false);
								}}
							>
								Save Changes
							</Button>
							<Button variant="outline-light" onClick={handleClose}>
								Cancel
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
				<p>{profileData?.introduction_and_title?.introduction}</p>
			</Card.Body>
		</Card>
	);
};

export default MyProfileCard;
