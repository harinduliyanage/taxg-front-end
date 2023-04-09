import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Form, Row } from "react-bootstrap";
import "./_custom-modal.scss";
import { Auth } from "aws-amplify";
import { headerConfig } from "../../../actions/headers";
import axios from "axios";
import { USER_DATA_API } from "../../../actions/endPoints";
import Select from "react-select";

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

const ModalExperience: React.FC<{
	getInformation(): void;
}> = (props) => {
	const [show, setShow] = useState(false);
	const [company, setCompany] = useState("");
	const [title, setTitle] = useState("");
	const [startYear, setStartYear] = useState("");
	const [startMonth, setStartMonth] = useState("");
	const [endYear, setEndYear] = useState("");
	const [endMonth, setEndMonth] = useState("");
	const [introduction, setIntroduction] = useState("");
	const [currentPosition, setCurrentPosition] = useState(false);
	// const [displayInContactCard, setDisplayInContactCard] = useState(false);
	const [employmentType, setEmploymentType] = useState("");
	const [companyError, setCompanyError] = useState("");
	const [titleError, setTitleError] = useState("");
	const [startYearError, setStartYearError] = useState("");
	const [startMonthError, setStartMonthError] = useState("");
	const [endYearError, setEndYearError] = useState("");
	const [endMonthError, setEndMonthError] = useState("");
	const [introductionError, setIntroductionError] = useState("");
	// const [currentPositionError, setCurrentPositionError] = useState(false);
	// const [displayInContactCardError, setDisplayInContactCardError] =
	// 	useState(false);
	const [employmentTypeError, setEmploymentTypeError] = useState("");
	const [disableOnSubmit, setDisableOnSubmit] = useState(false);

	const { getInformation } = props;

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const validate = () => {
		let validForm = true;
		if (company === "") {
			validForm = false;
			setCompanyError("Please enter the company");
		}
		if (title === "") {
			validForm = false;
			setTitleError("Please enter the title");
		}
		if (startYear === "") {
			validForm = false;
			setStartYearError("Select start year");
		}
		if (startMonth === "") {
			validForm = false;
			setStartMonthError("Select start month");
		}
		if (introduction === "") {
			validForm = false;
			setIntroductionError("Please enter the introduction");
		}
		if (employmentType === "") {
			validForm = false;
			setEmploymentTypeError("Please select the employment type");
		}

		if (!currentPosition) {
			if (endYear === "") {
				validForm = false;
				setEndYearError("Select end year");
			}
			if (endMonth === "") {
				validForm = false;
				setEndMonthError("Select end month");
			}
		}

		return validForm;
	};

	const addExperience = async () => {
		const validForm = validate();

		if (validForm) {
			setDisableOnSubmit(true);
			const { attributes } = await Auth.currentAuthenticatedUser();
			const uuid = attributes.sub;
			const findMonth = (month: string) => month === startMonth;
			const startMonthId = months.findIndex(findMonth) + 1;

			const findEndMonth = (month: string) => month === endMonth;
			const endMonthId = months.findIndex(findEndMonth) + 1;

			const body = {
				uuid: uuid,
				workExperience: [
					{
						status: 1,
						experienceID: null,
						company: company,
						title: title,
						introduction: introduction,
						startDate:
							startYear + "-" + String(startMonthId).padStart(2, "0") + "-01",
						endDate:
							endYear !== "" && endMonth !== ""
								? endYear + "-" + String(endMonthId).padStart(2, "0") + "-01"
								: null,
						employmentType: employmentType,
						currentPosition: currentPosition,
						displayInContactCard: false,
					},
				],
			};

			const config: any = await headerConfig();

			await axios
				.post(`${USER_DATA_API}/WorkExperience`, body, config)
				.then((res) => {
					getInformation();
					setCompany("");
					setTitle("");
					setIntroduction("");
					setStartYear("");
					setStartMonth("");
					setEndYear("");
					setEndMonth("");
					setEmploymentType("");
					setCurrentPosition(false);
					// setDisplayInContactCard(false);
					setDisableOnSubmit(false);
					handleClose();
				})
				.catch((err) => {
					setDisableOnSubmit(false);
					handleClose();
				});
		}
	};

	const handleCurrentPosition = (checked: boolean) => {
		setCurrentPosition(checked);
		if (checked) {
			setEndYear("");
			setEndMonth("");
		}
	};

	return (
		<>
			<Button variant="outline-light" size="sm" onClick={handleShow}>
				<i className="fal fa-plus" /> Add new
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				size={"lg"}
				centered={true}
			>
				<Modal.Body>
					<form id="editIntro">
						<div className="form-layout">
							<h3>Add new experience</h3>
							<Row>
								<Form.Group as={Col}>
									<Form.Label>Company</Form.Label>
									<Form.Control
										onChange={(e) => {
											setCompany(e.target.value);
											setCompanyError("");
										}}
										name="company"
										id="company"
										value={company || ""}
									/>
									{companyError && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{companyError}
										</Form.Control.Feedback>
									)}
								</Form.Group>
								<Form.Group as={Col}>
									<Form.Label>Title</Form.Label>
									<Form.Control
										onChange={(e) => {
											setTitle(e.target.value);
											setTitleError("");
										}}
										name="title"
										id="title"
										value={title}
									/>
									{titleError && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{titleError}
										</Form.Control.Feedback>
									)}
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
										onChange={(e: any) => {
											setStartYear(e.value);
											setStartYearError("");
										}}
										placeholder="Start year"
										value={
											startYear
												? {
														value: startYear,
														label: startYear,
												  }
												: null
										}
									/>
									{startYearError && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{startYearError}
										</Form.Control.Feedback>
									)}
								</Form.Group>
								<Form.Group as={Col}>
									<Select
										name="startMonth"
										options={months.map((option: any) => ({
											value: option,
											label: option,
										}))}
										onChange={(e: any) => {
											setStartMonth(e.value);
											setStartMonthError("");
										}}
										placeholder="Month"
										value={
											startMonth
												? {
														value: startMonth,
														label: startMonth,
												  }
												: null
										}
									/>
									{startMonthError && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{startMonthError}
										</Form.Control.Feedback>
									)}
								</Form.Group>
								<Form.Group as={Col}>
									<Select
										name="endYear"
										options={years.map((option: any) => ({
											value: option,
											label: option,
										}))}
										onChange={(e: any) => {
											setEndYear(e.value);
											setEndYearError("");
										}}
										placeholder="End year"
										value={
											endYear
												? {
														value: endYear,
														label: endYear,
												  }
												: null
										}
										isDisabled={currentPosition}
									/>
									{endYearError && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{endYearError}
										</Form.Control.Feedback>
									)}
								</Form.Group>
								<Form.Group as={Col}>
									<Select
										name="endMonth"
										options={months.map((option: any) => ({
											value: option,
											label: option,
										}))}
										onChange={(e: any) => {
											setEndMonth(e.value);
											setEndMonthError("");
										}}
										placeholder="Month"
										value={
											endMonth
												? {
														value: endMonth,
														label: endMonth,
												  }
												: null
										}
										isDisabled={currentPosition}
									/>
									{endMonthError && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{endMonthError}
										</Form.Control.Feedback>
									)}
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
											handleCurrentPosition(e.target.checked)
										}
										checked={currentPosition}
									/>
								</Form.Group>
								{/* {currentPosition ? (
									<Form.Group as={Col}>
										<Form.Check
											inline
											type="checkbox"
											name="displayInContactCard"
											id="displayInContactCard"
											label="Display this company in my contact card"
											onChange={(e: any) =>
												setDisplayInContactCard(e.target.checked)
											}
											checked={displayInContactCard}
										/>
									</Form.Group>
								) : null} */}
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
										onChange={(e: any) => {
											setEmploymentType(e.value);
											setEmploymentTypeError("");
										}}
										placeholder="Select"
										value={
											employmentType
												? {
														value: employmentType,
														label: employmentType,
												  }
												: null
										}
									/>
									{employmentTypeError && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{employmentTypeError}
										</Form.Control.Feedback>
									)}
								</Form.Group>
							</Row>

							<Row>
								<Form.Group as={Col}>
									<Form.Label>Introduction</Form.Label>
									<Form.Control
										as="textarea"
										rows={6}
										onChange={(e) => {
											setIntroduction(e.target.value);
											setIntroductionError("");
										}}
										name="introduction"
										id="introduction"
										value={introduction || ""}
									/>
								</Form.Group>
								{introductionError && (
									<Form.Control.Feedback type="invalid">
										<i className="fas fa-exclamation-circle" />
										{introductionError}
									</Form.Control.Feedback>
								)}
							</Row>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="dark"
						onClick={() => {
							addExperience();
						}}
						disabled={disableOnSubmit}
					>
						Add
					</Button>
					<Button variant="outline-light" onClick={handleClose}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalExperience;
