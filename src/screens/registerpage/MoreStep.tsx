import React, { useEffect, useState } from "react";
import {
	Alert,
	Col,
	Container,
	Form,
	Row,
	Button,
	Modal,
} from "react-bootstrap";
import AmplifyTemplate from "../templates/AmplifyTemplate";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import PhoneInput2 from "react-phone-input-2";

import "./_MoreStep.scss";
import { headerConfig } from "../../actions/headers";
import { Auth } from "aws-amplify";

interface IFormInputs {
	firstname: string;
	lastname: string;
	zipcode: string;
}

const MoreStep = () => {
	const [show, setShow] = useState(true);
	const { user } = useSelector((root: any) => root.auth);

	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [validFirstName, setValidFirstName] = React.useState(false);
	const [validLastName, setValidLastName] = React.useState(false);
	const [validZipCode, setValidZipCode] = React.useState(false);
	const [address, setAddress] = React.useState("");
	const [phone, setPhone] = React.useState("");
	const [validPhoneNumber, setValidPhoneNumber] = React.useState(false);
	const [email, setEmail] = React.useState("");
	// const [serverError, setServerError] = React.useState("");
	const [showVerifyMobileModal, setShowVerifyMobileModal] = useState(false);
	const [otp, setOTP] = useState<string[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [validOTP, setValidOTP] = React.useState(false);
	const [invalidOTP, setInvalidOTP] = React.useState(false);

	useEffect(() => {
		// if (user.status_id === 3) {
		// 	window.location.href = "/onboarding";
		// }
		// if (user.status_id === 2 || user.status_id === 4) {
		// 	if (user.role_type_id === 1) {
		// 		window.location.href = "/feed";
		// 	} else {
		// 		window.location.href = "/discover";
		// 	}
		// }

		setFirstName(user.user_first_name);
		setValidFirstName(true);
		if (user.user_last_name) {
			setLastName(user.user_last_name);
			setValidLastName(true);
		}
		setEmail(user.user_email);
	}, [user]);

	const {
		register,
		formState: { errors },
		clearErrors,
		setError,
	} = useForm<IFormInputs>();

	const setValidationError = (
		key: "firstname" | "lastname" | "zipcode",
		message: string
	) => {
		setError(key, {
			type: "custom",
			message,
		});
		// setServerError("");
	};

	const handleFirstNameChange = (e: any) => {
		const { value } = e.target;
		setFirstName(value);
		if (value.length > 0 && value.length < 64) {
			clearErrors("firstname");
			setValidFirstName(true);
		} else if (value.length === 0) {
			setValidationError("firstname", "");
			setValidFirstName(false);
		}
	};

	const handleLastNameChange = (e: any) => {
		const { value } = e.target;
		setLastName(value);
		if (value.length > 0 && value.length < 64) {
			clearErrors("lastname");
			setValidLastName(true);
		} else if (value.length === 0) {
			setValidationError("lastname", "");
			setValidLastName(false);
		}
	};

	const handleZipCodeChange = async (e: any) => {
		const { value } = e.target;
		setAddress("");
		if (value.length === 5) {
			clearErrors("zipcode");
			setValidZipCode(true);
			await axios
				.get(
					"https://app.zipcodebase.com/api/v1/search?apikey=df6e73b0-8aca-11ed-ab54-6f335d91f733&codes=" +
						value +
						"&country=US"
				)
				.then((res: any) => {
					if (res.data.results) {
						const addressData = res.data.results[value][0];
						const location =
							addressData.city + ", " + addressData.state + ", " + value;
						setAddress(location);
					}
				})
				.catch((error: any) => {
					console.log(error);
					setValidationError("zipcode", "");
					setValidZipCode(false);
				});
		} else {
			setValidationError("zipcode", "");
			setValidZipCode(false);
		}
	};

	const sendVerificationSMS = async () => {
		if (phone) {
			const { attributes } = await Auth.currentAuthenticatedUser();
			const config: any = await headerConfig();
			const body = {
				mobile_number: "+" + phone,
				uuid: attributes.sub,
			};

			await axios
				.post(
					"https://ngs72msu4j.execute-api.us-east-1.amazonaws.com/dev/sendSms",
					body,
					config
				)
				.then((res: any) => {
					setShowVerifyMobileModal(true);
				})
				.catch((error: any) => {
					console.log(error);
				});
		}
	};

	const verifyOTP = async (OTPVal: string) => {
		if (phone) {
			const { attributes } = await Auth.currentAuthenticatedUser();
			const config: any = await headerConfig();
			const body = {
				otp: parseInt(OTPVal, 10),
				uuid: attributes.sub,
			};
			setInvalidOTP(false);

			await axios
				.post(
					"https://kwjo0roqxd.execute-api.us-east-1.amazonaws.com/dev/VerifyOTP",
					body,
					config
				)
				.then((res: any) => {
					setValidOTP(true);
					setShowVerifyMobileModal(false);
				})
				.catch((error: any) => {
					console.log(error);
					setInvalidOTP(true);
				});
		}
	};

	const submitMoreDetails = async () => {
		if (phone) {
			const { attributes } = await Auth.currentAuthenticatedUser();
			const config: any = await headerConfig();

			const addressArray = address.split(",");
			const city = addressArray[0].trim();
			const state = addressArray[1].trim();
			const zip = addressArray[2].trim();

			const body = {
				uuid: attributes.sub,
				first_name: firstName,
				last_name: lastName,
				country: 238,
				state: state,
				city: city,
				zip_code: zip,
				mobile_number: "+1" + phone,
			};
			await axios
				.post(
					"https://4rivhcrxyg.execute-api.us-east-1.amazonaws.com/dev/PostFewMoreDetails",
					body,
					config
				)
				.then((res: any) => {
					window.location.href = "/onboarding";
				})
				.catch((error: any) => {
					console.log(error);
				});
		}
	};

	const handlePhoneNumberChange = (value: string) => {
		if (value.length === 11) {
			setValidPhoneNumber(true);
		}
		setPhone(value);
	};

	const handleClose = () => {
		setShowVerifyMobileModal(false);
	};

	const setOTPCode = (value: string, index: number) => {
		const updatedOTP = otp;
		updatedOTP[index] = value;
		setOTP(updatedOTP);

		const OTPVal = updatedOTP.join("");

		if (OTPVal.length === 4) {
			verifyOTP(OTPVal);
		}
	};

	if (firstName === "") {
		return <></>;
	}

	return (
		<AmplifyTemplate>
			<Modal
				className="verify-number"
				show={showVerifyMobileModal}
				onHide={handleClose}
			>
				<Modal.Body>
					<h1>Verify phone number</h1>
					<span className="content">
						Please enter the 4-digit verification code sent to <br />+{phone}
					</span>

					<div className="verification-code">
						<form action="">
							<Form.Group className="form-group">
								<Form.Control
									maxLength={1}
									onChange={(e) => setOTPCode(e.target.value, 0)}
								/>
								<Form.Control
									maxLength={1}
									onChange={(e) => setOTPCode(e.target.value, 1)}
									// readOnly={otp[0] === undefined ? true : false}
								/>
								<Form.Control
									maxLength={1}
									onChange={(e) => setOTPCode(e.target.value, 2)}
									// readOnly
								/>
								<Form.Control
									maxLength={1}
									onChange={(e) => setOTPCode(e.target.value, 3)}
									// readOnly
								/>
							</Form.Group>
							{invalidOTP ? (
								<Alert variant="danger" className="mt-3">
									<i className="far fa-exclamation-circle"></i> Oops. please try
									again
								</Alert>
							) : null}
						</form>
					</div>
				</Modal.Body>

				<Modal.Footer>
					<button className="btn btn-link" onClick={sendVerificationSMS}>
						RESEND THE CODE?
					</button>
					<Button
						variant="outline-light"
						onClick={() => setShowVerifyMobileModal(false)}
					>
						<i className="fal fa-long-arrow-left"></i> Change phone number
					</Button>
				</Modal.Footer>
			</Modal>

			<section className="login-page py-6 few-more">
				<Container>
					<div className="d-grid signup">
						<div className="signup-container">
							<div className="form-container">
								<Alert variant="success" className="mb-3">
									<i className="fas fa-check-circle"></i> Email address
									verified.
								</Alert>
								<h1 className="mb-0">Just a few more details...</h1>
								<p className="amplify-label mb-3">
									Let’s get you all set up so you can verify your personal
									account and begin setting up your business profiles.
								</p>
								<Form>
									<Row className="g-2">
										<Col md="6">
											<Form.Group>
												<Form.Label>First name</Form.Label>
												<input
													maxLength={64}
													type="text"
													{...register("firstname", {
														required: true,
														onChange: handleFirstNameChange,
													})}
													className={
														errors.firstname
															? "form-control is-invalid"
															: "form-control"
													}
													value={firstName}
												/>
											</Form.Group>
										</Col>
										<Col md="6">
											<Form.Group>
												<Form.Label>Last name</Form.Label>
												<input
													maxLength={64}
													type="text"
													{...register("lastname", {
														required: true,
														onChange: handleLastNameChange,
													})}
													className={
														errors.lastname
															? "form-control is-invalid"
															: "form-control"
													}
													value={lastName}
												/>
											</Form.Group>
										</Col>
									</Row>
									<Form.Group>
										<Form.Label>Email</Form.Label>
										<Form.Control value={email} readOnly={true} disabled />
									</Form.Group>
									<Row className="g-2">
										<Col md="6">
											<Form.Group>
												<Form.Label>Country</Form.Label>
												<Form.Select aria-label="country">
													<option>United States of America</option>
												</Form.Select>
											</Form.Group>
										</Col>
										<Col md="6">
											<Form.Group>
												<Form.Label>ZIP code</Form.Label>
												<input
													maxLength={5}
													type="text"
													{...register("zipcode", {
														required: true,
														onChange: handleZipCodeChange,
													})}
													className={
														errors.zipcode
															? "form-control is-invalid"
															: "form-control"
													}
												/>
											</Form.Group>
										</Col>
										{address ? (
											<Col md="12">
												<Alert
													variant="info-light"
													show={show}
													className="mb-0 mt-0"
												>
													<i className="fas fa-info-circle"></i> {address}
													<Button
														onClick={() => setShow(false)}
														variant="outline-success"
														className="close-icon"
													>
														<i className="fal fa-times"></i>
													</Button>
												</Alert>
											</Col>
										) : null}
									</Row>
									<Row className="g-2 align-items-end">
										<Col>
											<Form.Group className="mobile-number">
												<Form.Label>Phone number</Form.Label>
												<PhoneInput2
													country={"us"}
													value={phone}
													onChange={(e: any) => handlePhoneNumberChange(e)}
													countryCodeEditable={false}
												/>
												{validOTP ? (
													<span className="verified">
														<i className="fas fa-check-circle"></i>
													</span>
												) : null}
											</Form.Group>
										</Col>
										{!validOTP ? (
											<Col md="auto" className="align-bottom">
												<Form.Group>
													<button
														className="btn btn-outline-light btn-sm"
														type="button"
														disabled={!validPhoneNumber}
														onClick={sendVerificationSMS}
													>
														Verify
													</button>
												</Form.Group>
											</Col>
										) : null}
									</Row>
									<div className="page-action">
										<Button
											variant="dark"
											type="button"
											onClick={submitMoreDetails}
											disabled={
												!validFirstName ||
												!validLastName ||
												!validZipCode ||
												!validPhoneNumber
											}
										>
											Continue
										</Button>
										{/* <div className="custom-invalid-feedback">
                    <i className="fas fa-exclamation-circle"></i> Error message
                  </div> */}
									</div>
								</Form>
							</div>
						</div>
					</div>
				</Container>
			</section>
		</AmplifyTemplate>
	);
};

export default MoreStep;
