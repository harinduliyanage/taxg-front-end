import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

import AmplifyTemplate from "../templates/AmplifyTemplate";

import linkedInIcon from "../../assets/images/social-media-linkedin.svg";
import googleIcon from "../../assets/images/google.svg";
import "./Style.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SEO from "../../components/organisms/seo/SEO";

interface IFormInputs {
	email: string;
	firstname: string;
	lastname: string;
	password: string;
	confirm_password: string;
	acknowledgement: boolean;
}

function RegisterPage() {
	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
		clearErrors,
		getValues,
	} = useForm<IFormInputs>();

	const [serverError, setServerError] = React.useState("");
	const [passwordShown, setPasswordShown] = React.useState(false);
	const [passwordConfirmShown, setPasswordConfirmShown] = React.useState(false);
	const [validEmail, setValidEmail] = React.useState(false);
	const [validFirstName, setValidFirstName] = React.useState(false);
	const [validLastName, setValidLastName] = React.useState(false);
	const [validPassword, setValidPassword] = React.useState(false);
	const [validConfirmPassword, setValidConfirmPassword] = React.useState(false);
	const [userAcknowledgement, setUserAcknowledgement] = React.useState(false);

	const { user } = useSelector((root: any) => root.auth);

	useEffect(() => {
		if (user) window.location.href = "/";
	}, [user]);

	const setValidationError = (
		key: "email" | "password" | "firstname" | "lastname" | "confirm_password",
		message: string
	) => {
		setError(key, {
			type: "custom",
			message,
		});
		setServerError("");
	};

	const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
		await Auth.signUp({
			username: data.email.trim(),
			password: data.password.trim(),
			attributes: {
				email: data.email,
				name: data.firstname,
				"custom:lastname": data.lastname,
			},
			autoSignIn: {
				enabled: true,
			},
		})
			.then((res) => {
				sessionStorage.setItem("registerEmail", data.email);
				window.location.href = "/register-complete";
			})
			.catch((e) => {
				console.log(e.code);
				if (e.code === "UsernameExistsException") {
					setServerError(
						"This email address is already registered, please use a different one."
					);
				} else {
					setServerError(
						"Something went wrong while registering. Please try again."
					);
				}
			});
	};

	const onError = (error: any) => {
		console.log(error);
	};

	const handleEmailChange = (e: any) => {
		const { value } = e.target;
		const validRegex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (value.length === 0) {
			setValidationError("email", "");
		} else if (value.length > 254) {
			setValidationError("email", "Too many characters in the email.");
		} else if (!value.match(validRegex)) {
			setValidationError("email", "Invalid email address.");
		} else {
			setValidEmail(true);
			clearErrors("email");
		}
	};

	const handleFirstNameChange = (e: any) => {
		const { value } = e.target;
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
		if (value.length > 0 && value.length < 64) {
			clearErrors("lastname");
			setValidLastName(true);
		} else if (value.length === 0) {
			setValidationError("lastname", "");
			setValidLastName(false);
		}
	};

	const handlePasswordChange = (e: any) => {
		const { value } = e.target;
		const _types: any = {};

		setValidationError("password", "");

		if (value.length === 0) {
			setValidationError("password", "Password is required");
			return;
		} else if (value.length > 50) {
			setValidationError("password", "Too many characters in password");
			return;
		} else if (value.length > 0 && value.length <= 50) {
			if (value.length < 8) {
				_types.error1 = "Password should have at least 8 characters.";
			}
			const specialCharPattern = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g;
			if (!specialCharPattern.test(value)) {
				_types.error2 = "Password should have at least a special character.";
			}
			const upperCasePattern = /[A-Z]/;
			if (!upperCasePattern.test(value)) {
				_types.error3 = "Password should have at least a uppercase character.";
			}
			const lowerCasePattern = /[a-z]/;
			if (!lowerCasePattern.test(value)) {
				_types.error4 = "Password should have at least a lowercase character.";
			}
			const numberPattern = /[0-9]/;
			if (!numberPattern.test(value)) {
				_types.error5 = "Password should have at least a numerical value.";
			}
			setError("password", {
				types: _types,
			});
		}

		if (Object.keys(_types).length === 0) {
			setValidPassword(true);
		}
	};

	const handleConfirmPasswordChange = (e: any) => {
		const { value } = e.target;
		const { password } = getValues();

		if (value.length === 0) {
			setValidationError("confirm_password", "");
			setValidConfirmPassword(false);
		} else if (value.trim() !== password.trim()) {
			setValidationError("confirm_password", "Passwords do not match");
			setValidConfirmPassword(false);
		} else {
			setValidConfirmPassword(true);
			clearErrors("confirm_password");
		}
	};

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	const toggleConfirmPassword = () => {
		setPasswordConfirmShown(!passwordConfirmShown);
	};

	const handleAcknowledgement = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setUserAcknowledgement(true);
		} else {
			setUserAcknowledgement(false);
		}
	};

	return (
		<AmplifyTemplate>
			<SEO title="TaxGloabal" description="TaxGlobal Login Register Page" />
			<section className="login-page py-6">
				<Container>
					<div className="d-grid signup">
						<div className="signup-container">
							<div className="form-container">
								<h1>Sign-up to continue</h1>

								<div className="social-signup">
									<Button
										variant="outline-light"
										onClick={() =>
											Auth.federatedSignIn({
												customProvider: "LinkedIn",
											})
										}
									>
										<img src={linkedInIcon} alt="linkedin" /> Sign-in with
										LinkedIn
									</Button>
									<Button
										variant="outline-light"
										onClick={() =>
											Auth.federatedSignIn({
												provider: CognitoHostedUIIdentityProvider.Google,
											})
										}
									>
										<img src={googleIcon} alt="Google" /> Sign-in with Google
									</Button>
								</div>

								<p className="amplify-label">
									Or sign-up with your email address
								</p>

								<form
									id="registerForm"
									onSubmit={handleSubmit(onSubmit, onError)}
									className="login-form"
								>
									<Row className="g-2">
										<Col md="6">
											<Form.Group className="form-group" controlId="firstname">
												<label className="form-label">First Name</label>
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
												/>
												{errors.firstname?.message && (
													<Form.Control.Feedback type="invalid">
														<i className="fas fa-exclamation-circle" />
														{errors.firstname.message?.toString()}
													</Form.Control.Feedback>
												)}
											</Form.Group>
										</Col>
										<Col md="6">
											<Form.Group className="form-group" controlId="lastname">
												<label className="form-label">Last Name</label>
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
												/>
												{errors.lastname?.message && (
													<Form.Control.Feedback type="invalid">
														<i className="fas fa-exclamation-circle" />
														{errors.lastname.message?.toString()}
													</Form.Control.Feedback>
												)}
											</Form.Group>
										</Col>
									</Row>

									<Form.Group className="form-group" controlId="Email">
										<label className="form-label">Email</label>
										<input
											maxLength={254}
											{...register("email", {
												required: true,
												onChange: handleEmailChange,
											})}
											className={
												errors.email
													? "form-control is-invalid"
													: "form-control"
											}
										/>
										{errors.email?.message && (
											<Form.Control.Feedback type="invalid">
												<i className="fas fa-exclamation-circle" />
												{errors.email.message?.toString()}
											</Form.Control.Feedback>
										)}
									</Form.Group>

									<Form.Group className="form-group" controlId="password">
										<label className="form-label">Password</label>

										<InputGroup
											className={errors.password?.types ? "is-invalid" : ""}
										>
											<input
												maxLength={50}
												type={passwordShown ? "text" : "password"}
												{...register("password", {
													required: true,
													onChange: handlePasswordChange,
												})}
												className={
													errors.password?.message ||
													(errors.password?.types &&
														Object.keys(errors.password?.types).length)
														? "form-control is-invalid"
														: "form-control"
												}
											/>
											<InputGroup.Text>
												<i
													className={
														!passwordShown ? "fal fa-eye-slash" : "fal fa-eye"
													}
													onClick={togglePassword}
												></i>
											</InputGroup.Text>
										</InputGroup>
										{errors.password?.types && (
											<Form.Control.Feedback type="invalid">
												<ul>
													{Object.values(errors.password.types).map(
														(err, i) => (
															<li key={i}>
																<i className="fas fa-exclamation-circle me-2" />
																{err?.toString()}
															</li>
														)
													)}
												</ul>
											</Form.Control.Feedback>
										)}
									</Form.Group>

									<Form.Group
										className="form-group"
										controlId="confirm_password"
									>
										<label className="form-label">Confirm Password</label>
										<InputGroup
											className={errors.confirm_password ? "is-invalid" : ""}
										>
											<input
												maxLength={50}
												type={passwordConfirmShown ? "text" : "password"}
												{...register("confirm_password", {
													required: true,
													onChange: handleConfirmPasswordChange,
												})}
												className={
													errors.confirm_password
														? "form-control is-invalid"
														: "form-control"
												}
											/>
											<InputGroup.Text>
												<i
													className={
														!passwordConfirmShown
															? "fal fa-eye-slash"
															: "fal fa-eye"
													}
													onClick={toggleConfirmPassword}
												></i>
											</InputGroup.Text>
										</InputGroup>
										{errors.confirm_password?.message && (
											<Form.Control.Feedback type="invalid">
												<i className="fas fa-exclamation-circle" />
												{errors.confirm_password.message?.toString()}
											</Form.Control.Feedback>
										)}
									</Form.Group>

									<Form.Group className="form-group mb-3">
										<div className="form-check">
											<input
												type="checkbox"
												{...register("acknowledgement", {})}
												className="form-check-input"
												id="acknowledgement"
												onChange={handleAcknowledgement}
											/>
											<label
												htmlFor="acknowledgement"
												className="form-check-label"
											>
												Creating an account means you’re okay with our{" "}
												<a href="/terms" target="_blank">
													Terms of Service
												</a>
												,{" "}
												<a href="/privacy" target="_blank">
													Privacy Policy
												</a>
												, and our default Notification Settings.
											</label>
										</div>
									</Form.Group>

									<div className="page-action">
										<Button
											variant="dark"
											type="submit"
											disabled={
												!validEmail ||
												!validFirstName ||
												!validLastName ||
												!validPassword ||
												!validConfirmPassword ||
												!userAcknowledgement
											}
										>
											Create account
										</Button>
										{serverError && (
											<div className="custom-invalid-feedback">
												<i className="fas fa-exclamation-circle"></i>
												{serverError?.toString()}
											</div>
										)}
									</div>
								</form>
								<div className="cross-check">
									<h6 className="small-text">Already have an account?</h6>

									<Button variant="link" href="/login">
										Sign in
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>
		</AmplifyTemplate>
	);
}

export default RegisterPage;
