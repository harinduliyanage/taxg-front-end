import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Form, Row } from "react-bootstrap";
import "./_custom-modal.scss";
import { Auth } from "aws-amplify";
import { headerConfig } from "../../../actions/headers";
import axios from "axios";
import { USER_DATA_API } from "../../../actions/endPoints";

const ModalCertificates: React.FC<{
	getInformation(): void;
}> = (props) => {
	const [name, setName] = useState("");
	const [nameError, setNameError] = useState("");
	const [year, setYear] = useState("");
	const [yearError, setYearError] = useState("");
	const [organization, setOrganization] = useState("");
	const [organizationError, setOrganizationError] = useState("");
	const [show, setShow] = useState(false);
	const [disableOnSaving, setDisableOnSaving] = useState(false);

	const { getInformation } = props;

	const handleClose = () => {
		setShow(false);
		setNameError("");
		setYearError("");
		setOrganizationError("");
	};
	const handleShow = () => setShow(true);

	const addCertificate = async () => {
		const { attributes } = await Auth.currentAuthenticatedUser();
		const uuid = attributes.sub;
		let validForm = true;

		if (name === "") {
			setNameError("Please enter the name");
			validForm = false;
		}
		if (year === "") {
			setYearError("Please enter the year");
			validForm = false;
		}
		if (organization === "") {
			setOrganizationError("Please enter the organization");
			validForm = false;
		}

		if (validForm) {
			setDisableOnSaving(true);
			const body = {
				uuid: uuid,
				certificates: [
					{
						status: 1,
						certID: null,
						certName: name,
						certificate_year: year,
						issuingOrg: organization,
					},
				],
			};

			const config: any = await headerConfig();

			axios
				.post(`${USER_DATA_API}/Certificates`, body, config)
				.then(() => {
					getInformation();
					setName("");
					setYear("");
					setOrganization("");
					handleClose();
					setDisableOnSaving(false);
				})
				.catch((err) => {
					setDisableOnSaving(false);
					console.log(err);
				});
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
					<form id="editCertificate">
						<div className="form-layout">
							<h3>Add new certificate</h3>
							<Row>
								<Col md="8">
									<Form.Group>
										<Form.Label>Name</Form.Label>
										<Form.Control
											onChange={(e) => setName(e.target.value)}
											name="name"
											id="name"
											value={name || ""}
										/>
										{nameError && (
											<Form.Control.Feedback type="invalid">
												<i className="fas fa-exclamation-circle" />
												{nameError}
											</Form.Control.Feedback>
										)}
									</Form.Group>
								</Col>
								<Col md="4">
									<Form.Group>
										<Form.Label>Year</Form.Label>
										<Form.Control
											onChange={(e) => setYear(e.target.value)}
											name="year"
											id="year"
											value={year || ""}
										/>
										{yearError && (
											<Form.Control.Feedback type="invalid">
												<i className="fas fa-exclamation-circle" />
												{yearError}
											</Form.Control.Feedback>
										)}
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Form.Group as={Col}>
									<Form.Label>Issuing organization</Form.Label>
									<Form.Control
										onChange={(e) => setOrganization(e.target.value)}
										name="organization"
										id="organization"
										value={organization || ""}
									/>
									{organizationError && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{organizationError}
										</Form.Control.Feedback>
									)}
								</Form.Group>
							</Row>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="dark"
						onClick={() => {
							addCertificate();
						}}
						disabled={disableOnSaving}
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

export default ModalCertificates;
