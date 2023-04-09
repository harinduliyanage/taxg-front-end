import { Auth } from "aws-amplify";
import { FC, useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { headerConfig } from "../../../actions/headers";
import axios from "axios";
import {
	USER_DATA_API,
	USER_SHOW_IN_CONTACT_CARD_API,
} from "../../../actions/endPoints";
import { ProfileData } from "../../../interfaces/models/ProfileData";
import { List, arrayMove } from "react-movable";
import Experience from "../profile/Experience";
import ModalExperience from "../modal/ModalExperience";
import Select from "react-select";

interface Props {
	profileData: ProfileData | null;
	getInformation: () => void;
}

type ExperienceType = {
	company: string;
	id: number;
	introduction: string;
	title: string;
	start_date: string;
	startYear: string;
	startMonth: string;
	end_date: string | null;
	endYear: string;
	endMonth: string;
	current_position: boolean;
	employment_type: string;
	show_in_contact_card: boolean;
};

const year = new Date().getFullYear();
const years = Array.from(new Array(50), (val, index) => year - index);
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const employmentTypes = [
	"Full-time",
	"Part-time",
	"Self-employed",
	"Freelance",
	"Contract",
	"Internship",
	"Apprenticeship",
	"Seasonal",
];

const ExperienceCard: FC<Props> = (props) => {
	const [showEditExperienceModal, setShowEditExperienceModal] = useState(false);
	const [editingExperience, setEditingExperience] =
		useState<ExperienceType | null>(null);
	const [showRemoveExperienceModal, setShowRemoveExperienceModal] =
		useState(false);
	const [currentExpId, setCurrentExpId] = useState("");
	const [experiences, setExperiences] = useState<any>([]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [updated, setUpdated] = useState("");

	const handleClose = () => {
		setShowRemoveExperienceModal(false);
		setShowEditExperienceModal(false);
	};
	const [enableEditButton, setEnableEditButton] = useState(false);
	const [items, setItems] = useState(["item1"]);
	const [formError, setFormError] = useState("");
	const { profileData, getInformation } = props;

	useEffect(() => {
		if (profileData?.work_experinces?.length) {
			setExperiences(profileData.work_experinces);
		}
	}, [profileData?.work_experinces, profileData]);

	const updateExperience = (
		elementName:
			| "title"
			| "company"
			| "introduction"
			| "startYear"
			| "startMonth"
			| "start_date"
			| "end_date"
			| "endYear"
			| "endMonth"
			| "current_position"
			| "employment_type",
		elementVal: string
	) => {
		setFormError("");
		const updateExperiences = editingExperience;
		if (updateExperiences !== null) {
			if (elementName === "startYear") {
				const currentStartDate = editingExperience?.start_date.split("-");
				let updatedDate = editingExperience?.start_date || "";
				if (currentStartDate) {
					updatedDate =
						elementVal + "-" + currentStartDate[1] + "-" + currentStartDate[2];
				}
				updateExperiences.start_date = updatedDate;
				setEditingExperience(updateExperiences);
				setUpdated(elementVal);
			} else if (elementName === "startMonth") {
				const currentStartDate = editingExperience?.start_date.split("-");
				let updatedDate = editingExperience?.start_date || "";
				if (currentStartDate) {
					const findMonth = (month: string) => month === elementVal;
					const monthId = months.findIndex(findMonth) + 1;
					updatedDate =
						currentStartDate[0] +
						"-" +
						String(monthId).padStart(2, "0") +
						"-" +
						currentStartDate[2];
				}
				updateExperiences.start_date = updatedDate;
				setEditingExperience(updateExperiences);
				setUpdated(elementVal);
			} else if (elementName === "endYear") {
				const currentStartDate = editingExperience?.end_date
					? editingExperience?.end_date.split("-")
					: null;
				let updatedDate = editingExperience?.end_date || "";
				if (currentStartDate) {
					updatedDate =
						elementVal + "-" + currentStartDate[1] + "-" + currentStartDate[2];
				} else {
					updatedDate = elementVal + "-00-00";
				}
				updateExperiences.end_date = updatedDate;
				setEditingExperience(updateExperiences);
				setUpdated(elementVal);
			} else if (elementName === "endMonth") {
				const currentStartDate = editingExperience?.end_date
					? editingExperience?.end_date.split("-")
					: null;
				let updatedDate = editingExperience?.end_date || null;
				if (currentStartDate) {
					const findMonth = (month: string) => month === elementVal;
					const monthId = months.findIndex(findMonth) + 1;
					updatedDate =
						currentStartDate[0] +
						"-" +
						String(monthId).padStart(2, "0") +
						"-" +
						currentStartDate[2];
				} else {
					const findMonth = (month: string) => month === elementVal;
					const monthId = months.findIndex(findMonth) + 1;
					updatedDate = "0000-" + String(monthId).padStart(2, "0") + "-00";
				}
				updateExperiences.end_date = updatedDate;
				setEditingExperience(updateExperiences);
				setUpdated(elementVal);
			} else if (elementName === "current_position") {
				if (elementVal === "true") {
					updateExperiences.current_position = true;
					updateExperiences.end_date = null;
				} else {
					updateExperiences.current_position = false;
					updateExperiences.show_in_contact_card = false;
				}
				setEditingExperience(updateExperiences);
				setUpdated(elementVal);
			} else {
				updateExperiences[elementName] = elementVal;
				// updateExperiences[elementId][elementName] = elementVal;
				setEditingExperience(updateExperiences);
				setUpdated(elementVal);
			}
		}
	};

	const saveUpdatedExperience = async () => {
		const { attributes } = await Auth.currentAuthenticatedUser();
		const uuid = attributes.sub;
		setFormError("");
		let validForm = true;
		if (editingExperience !== null) {
			if (editingExperience.title === "") validForm = false;
			if (editingExperience.company === "") validForm = false;
			if (editingExperience.introduction === "") validForm = false;
			if (editingExperience.employment_type === "") validForm = false;
			if (editingExperience.start_date === "") validForm = false;

			if (!editingExperience.current_position) {
				if (editingExperience.end_date === null) {
					validForm = false;
				}
				if (editingExperience.end_date !== null) {
					const endDateArr = editingExperience.end_date.split("-");
					if (endDateArr[0] === "0000" || endDateArr[1] === "00") {
						validForm = false;
					}
				}
			}
		}

		if (validForm) {
			const body = {
				uuid: uuid,
				workExperience: [
					{
						status: 2,
						experienceID: currentExpId,
						company: editingExperience?.company,
						title: editingExperience?.title,
						introduction: editingExperience?.introduction,
						startDate: editingExperience?.start_date,
						endDate: editingExperience?.end_date,
						employmentType: editingExperience?.employment_type,
						currentPosition: editingExperience?.current_position,
						displayInContactCard: editingExperience?.show_in_contact_card,
					},
				],
			};

			const config: any = await headerConfig();

			axios
				.post(`${USER_DATA_API}/WorkExperience`, body, config)
				.then(() => {
					getInformation();
					setShowEditExperienceModal(false);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			setFormError("Please add all requried data");
		}
	};

	const saveShowInContactCard = async (experience: any, checked: any) => {
		// let currentPositionCount = 0;
		// experiences.forEach((element: any) => {
		// 	if (element.current_position) currentPositionCount += 1;
		// });

		// if (currentPositionCount > 1) {
		const { attributes } = await Auth.currentAuthenticatedUser();
		const uuid = attributes.sub;
		const body = {
			uuid: uuid,
			workExperience: {
				expirenceId: experience.id,
				showInContactCard: checked,
			},
		};

		if (checked) {
			const savedExperiences = experiences;
			savedExperiences.forEach((element: any) => {
				if (element.id !== experience.id) {
					element.show_in_contact_card = 0;
				}
			});
			setExperiences(savedExperiences);
		}

		const config: any = await headerConfig();

		axios
			.put(`${USER_SHOW_IN_CONTACT_CARD_API}`, body, config)
			.then(() => {
				setShowEditExperienceModal(false);
				getInformation();
			})
			.catch((err) => {
				console.log(err);
			});
		// }
	};

	const removeExperience = async (id: string) => {
		const { attributes } = await Auth.currentAuthenticatedUser();
		const uuid = attributes.sub;

		const body = {
			uuid: uuid,
			workExperience: [
				{
					status: 3,
					experienceID: id,
					sortOrderNumber: 1,
					company: editingExperience?.company,
					title: "title",
					introduction: "expIntroduction",
				},
			],
		};

		const config: any = await headerConfig();

		axios
			.post(`${USER_DATA_API}/WorkExperience`, body, config)
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
				<Modal
					show={showEditExperienceModal}
					onHide={handleClose}
					backdrop="static"
					keyboard={false}
					size={"lg"}
					centered={true}
				>
					<Modal.Body>
						{editingExperience ? (
							<div className="form-layout">
								<h3>Edit Experience</h3>
								<Row>
									<Form.Group as={Col} controlId="formGridEmail">
										<Form.Label>Company</Form.Label>
										<input
											className="form-control"
											type="text"
											onChange={(e) => {
												updateExperience("company", e.target.value);
											}}
											defaultValue={editingExperience?.company}
										/>
									</Form.Group>
									<Form.Group as={Col} controlId="formGridPassword">
										<Form.Label>Title</Form.Label>
										<input
											className="form-control"
											type="text"
											onChange={(e) => {
												updateExperience("title", e.target.value);
											}}
											defaultValue={editingExperience?.title}
										/>
									</Form.Group>
								</Row>

								<Row>
									<div className="section-label">Duration</div>
									<Form.Group as={Col}>
										<Select
											name="startYear"
											options={years.map((option: any) => ({
												value: option,
												label: option,
											}))}
											onChange={(e: any) =>
												updateExperience("startYear", e.value)
											}
											value={
												editingExperience?.start_date
													? {
															value:
																editingExperience.start_date.split("-")[0] ||
																"",
															label:
																editingExperience.start_date.split("-")[0] ||
																"",
													  }
													: null
											}
											placeholder="Start year"
										/>
									</Form.Group>
									<Form.Group as={Col}>
										<Select
											name="startMonth"
											options={months.map((option: any) => ({
												value: option,
												label: option,
											}))}
											onChange={(e: any) =>
												updateExperience("startMonth", e.value)
											}
											value={
												editingExperience?.start_date
													? {
															value:
																months[
																	parseInt(
																		editingExperience.start_date.split("-")[1],
																		10
																	) - 1
																] || "",
															label:
																months[
																	parseInt(
																		editingExperience.start_date.split("-")[1],
																		10
																	) - 1
																] || "",
													  }
													: null
											}
											placeholder="Month"
										/>
									</Form.Group>
									<Form.Group as={Col}>
										<Select
											name="endYear"
											options={years.map((option: any) => ({
												value: option,
												label: option,
											}))}
											onChange={(e: any) =>
												updateExperience("endYear", e.value)
											}
											value={
												editingExperience.end_date
													? {
															value:
																editingExperience.end_date.split("-")[0] !==
																"0000"
																	? editingExperience.end_date.split("-")[0]
																	: "",
															label:
																editingExperience.end_date.split("-")[0] !==
																"0000"
																	? editingExperience.end_date.split("-")[0]
																	: "",
													  }
													: null
											}
											placeholder="End year"
											isDisabled={editingExperience?.current_position}
										/>
									</Form.Group>
									<Form.Group as={Col}>
										<Select
											name="endMonth"
											options={months.map((option: any) => ({
												value: option,
												label: option,
											}))}
											onChange={(e: any) =>
												updateExperience("endMonth", e.value)
											}
											value={
												editingExperience.end_date
													? {
															value:
																editingExperience.end_date.split("-")[1] !==
																"00"
																	? months[
																			parseInt(
																				editingExperience.end_date.split(
																					"-"
																				)[1],
																				10
																			) - 1
																	  ]
																	: "",
															label:
																editingExperience.end_date.split("-")[1] !==
																	"00" || editingExperience.end_date !== null
																	? months[
																			parseInt(
																				editingExperience.end_date.split(
																					"-"
																				)[1],
																				10
																			) - 1
																	  ]
																	: "",
													  }
													: null
											}
											placeholder="Month"
											isDisabled={editingExperience?.current_position}
										/>
									</Form.Group>
								</Row>

								<Row>
									<Form.Group as={Col}>
										<Form.Check
											inline
											type="checkbox"
											id="currentPosition"
											name="currentPosition"
											label="This is my current position"
											onChange={(e: any) =>
												updateExperience(
													"current_position",
													`${e.target.checked}`
												)
											}
											checked={
												editingExperience?.current_position ? true : false
											}
										/>
									</Form.Group>
								</Row>

								<Row>
									<Form.Group as={Col}>
										<Form.Label>Employment Type</Form.Label>
										<Select
											name="employmentType"
											options={employmentTypes.map((option: any) => ({
												value: option,
												label: option,
											}))}
											onChange={(e: any) =>
												updateExperience("employment_type", e.value)
											}
											value={
												editingExperience.employment_type
													? {
															value: employmentTypes.find(
																(element) =>
																	element === editingExperience?.employment_type
															),
															label: employmentTypes.find(
																(element) =>
																	element === editingExperience?.employment_type
															),
													  }
													: null
											}
											placeholder="Select"
										/>
									</Form.Group>
								</Row>

								<Row>
									<Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
										<Form.Label>Introduction</Form.Label>
										<textarea
											className="form-control"
											rows={6}
											onChange={(e) => {
												updateExperience("introduction", e.target.value);
											}}
											defaultValue={editingExperience?.introduction}
										/>
									</Form.Group>
								</Row>
							</div>
						) : null}
					</Modal.Body>
					{formError !== "" ? (
						<Modal.Footer>
							<div className="custom-invalid-feedback">
								<i className="fas fa-exclamation-circle" />
								{formError}
							</div>
						</Modal.Footer>
					) : null}
					<Modal.Footer>
						<Button
							variant="dark"
							onClick={() => {
								saveUpdatedExperience();
							}}
						>
							Save Changes
						</Button>
						<Button variant="outline-light" onClick={handleClose}>
							Cancel
						</Button>
					</Modal.Footer>
				</Modal>

				<Modal show={showRemoveExperienceModal}>
					<Modal.Body>
						<h3>Are you sure?</h3>
						<p>
							You are about to remove a work experience and this action cannot
							be undone. Press cancel to go back.
						</p>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="danger"
							onClick={() => {
								removeExperience(currentExpId);
								setShowRemoveExperienceModal(false);
							}}
						>
							Remove
						</Button>
						<Button variant="outline-light" onClick={handleClose}>
							Cancel
						</Button>
					</Modal.Footer>
				</Modal>
				{enableEditButton ? (
					<>
						<div className="edit-widget">
							<div className="back-nav">
								<Button
									variant="link"
									onClick={() => {
										setEnableEditButton(false);
									}}
								>
									<i className="fal fa-long-arrow-left"></i>
								</Button>
								<h3>Experience</h3>
							</div>
							<ModalExperience getInformation={getInformation} />
						</div>
					</>
				) : (
					<>
						<div className="edit-widget">
							<h3>Experience</h3>
							<Button
								variant="outline-light"
								size="sm"
								onClick={() => {
									setEnableEditButton(true);
									// hideEditButton();
								}}
							>
								<i className="fas fa-pencil" /> Edit
							</Button>
						</div>
					</>
				)}
				{experiences !== null &&
					experiences.map((work_experience: any) => {
						return (
							<div key={work_experience.id}>
								{enableEditButton ? (
									<List
										key={work_experience.id}
										values={items}
										onChange={({ oldIndex, newIndex }: any) =>
											setItems(arrayMove(items, oldIndex, newIndex))
										}
										renderList={({ children, props }: any) => (
											<div className="sort-wrapper" {...props}>
												{children}
											</div>
										)}
										renderItem={({ value, props }: any) => (
											<div {...props}>
												<div className="sort-item">
													<Experience
														key={work_experience.id}
														companyName={work_experience.company}
														position={work_experience.title}
														start={work_experience.start_date}
														end={work_experience.end_date}
														employmentType={work_experience.employment_type}
													>
														<p>{work_experience.introduction}</p>
													</Experience>
													<div className="edit-row">
														<Button
															variant="outline-light"
															size="sm"
															onClick={() => {
																setEditingExperience(work_experience);
																setCurrentExpId(work_experience.id);
																setShowEditExperienceModal(true);
															}}
														>
															Edit
														</Button>
														<Button
															variant="outline-danger"
															size="sm"
															onClick={() => {
																setShowRemoveExperienceModal(true);
																setCurrentExpId(work_experience.id);
															}}
														>
															Remove
														</Button>

														<span className="me-0 ms-auto">
															<Form.Check
																reverse
																type="switch"
																id="showContactCard"
																label="Show in my contact card"
																checked={
																	work_experience.show_in_contact_card
																		? true
																		: false
																}
																onChange={(e) =>
																	saveShowInContactCard(
																		work_experience,
																		e.target.checked
																	)
																}
																disabled={
																	work_experience.current_position
																		? false
																		: true
																}
															/>
														</span>
													</div>
												</div>
											</div>
										)}
									/>
								) : (
									<Experience
										key={work_experience.id}
										companyName={work_experience.company}
										position={work_experience.title}
										start={work_experience.start_date}
										end={work_experience.end_date}
										employmentType={work_experience.employment_type}
									>
										<p>{work_experience.introduction}</p>
									</Experience>
								)}
							</div>
						);
					})}
			</Card.Body>
		</Card>
	);
};

export default ExperienceCard;
