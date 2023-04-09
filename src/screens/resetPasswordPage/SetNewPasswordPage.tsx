import { useForm, SubmitHandler } from "react-hook-form";
import { Auth } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { Button, Card, Container, Form } from "react-bootstrap";
import AmplifyTemplate from "../templates/AmplifyTemplate";
import React, { FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./_resetPassword.scss";
// enum PasswordValidationErrors {
//   error1 = "this is error 1",
//   error2 = "this is error 2",
// }
interface IFormInputs {
	password: string;
	confirmPassword: string;
}

const SetNewPasswordPage: FC = () => {
	const [serverError, setServerError] = React.useState("");

	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
	} = useForm<IFormInputs>();

	const [params] = useSearchParams();
	const nav = useNavigate();

	const setValidationError = (
		key: "password" | "confirmPassword",
		message: any
	) => {
		setError(key, { type: "custom", message });
		setServerError("");
	};

	// const setPasswordValidationError = (
	//   key: "password" | "confirmPassword",
	//   message: string
	// ) => {
	//   setError(key, {
	//     type: "custom",
	//     // types: types.map(error => error as MultipleFieldErrors),
	//     message,
	//   });
	//   setServerError("");
	// };

	const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
		console.log("err", data);
		// validations
		if (data.password !== data.confirmPassword) {
			setValidationError("confirmPassword", "Passwords don’t match!");
			return;
		}

		if (data.password === "") {
			setValidationError("password", "Please enter a password.");
		}

		const username = params.get("user_name");
		const code = params.get("confirmation_code");

		if (username && code) {
			Auth.forgotPasswordSubmit(username, code, data.password).then((res) =>
				nav("/reset-password-success")
			);
		} else {
			alert("Username or OTP Code missing");
		}
	};

	const onError = (error: any) => {
		if (error?.confirmPassword?.message.length === 0) {
			setValidationError(
				"confirmPassword",
				"Password confirmation is required."
			);
		}
		if (error?.password?.message.length === 0) {
			setValidationError("password", "Please enter a password.");
		}

		// console.log("error", error);
	};

	const handlePasswordFocusOut = (e: any) => {
		const { value } = e.target;
		const _types: any = {};
		console.log(value);

		if (value === "") {
			setValidationError("password", "");
		} else {
			if (!value.match("[a-z]")) {
				// setValidationError(
				//   "password",
				//   "Password should have at least a lowercase character."
				//   // error2: "another error",
				// );
				// return;
				_types.error1 = "Password should have at least a lowercase character.";
			}
			// setValidationError("password", "");
			if (!value.match("[A-Z]")) {
				// setValidationError(
				//   "password",
				//   "Password should have at least an uppercase character."
				// );
				// return;
				_types.error2 = "Password should have at least an uppercase character.";
			}
			// setValidationError("password", "");
			if (!value.match("[0-9]")) {
				// setValidationError(
				//   "password",
				//   "Password should have at least a numerical value."
				// );
				// return;
				_types.error3 = "Password should have at least a numerical value.";
			}
			// setValidationError("password", "");
			if (
				!value.match(
					"_|[^abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789]"
				)
			) {
				// setValidationError(
				//   "password",
				//   "Password should have at least a special character."
				// );
				// return;
				_types.error4 = "Password should have at least a special character.";
			}
			// setValidationError("password", "");
			if (value.length < 8) {
				// setValidationError(
				//   "password",
				//   "Password should have at least 8 characters."
				// );
				// return;
				_types.error5 = "Password should have at least 8 characters.";
			}
			// setValidationError("password", "");
		}

		// console.log("errpc", _types);
		setError("password", {
			types: _types,
		});

		// console.log("error");
	};

	const handlePasswordChange = (e: any) => {
		setError("password", {
			types: {},
		});
	};

	// console.log(Object.values(errors?.password?.types || {}));

	return (
		<AmplifyTemplate>
			<section className="login-journey py-7">
				<Container>
					<Card className="single-page">
						<Card.Body>
							<div className="title-section">
								<h1>Set new password</h1>
								<p>
									Your new password must be different to previously used
									passwords.
								</p>
							</div>
							<form id="loginForm" onSubmit={handleSubmit(onSubmit, onError)}>
								<Form.Group
									className="form-group mb-2"
									controlId="reset-password"
								>
									<label className="form-label">Password</label>
									<input
										// onChange={handleChange}
										maxLength={50}
										type="password"
										{...register("password", {
											required: true,
											// maxLength: 10,
											onBlur: handlePasswordFocusOut,
											onChange: handlePasswordChange,
										})}
										className={
											errors.password?.message
												? "form-control is-invalid"
												: "form-control"
										}
									/>
									<Form.Text className="text-muted">
										Use 8 or more character with a mix of letters, numbers and
										symbols
									</Form.Text>

									{errors.password?.types && (
										<div>
											{Object.values(errors.password.types).map((err) => (
												<div style={{ color: "red" }}>
													<i className="fas fa-exclamation-circle" />
													{err?.toString()}
												</div>
											))}
										</div>
									)}
									{errors.password?.message && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{errors.password.message?.toString()}
										</Form.Control.Feedback>
									)}
									{/* Use 8 or more character with a mix of letters, numbers and
                  symbols
                </p> */}
								</Form.Group>
								<Form.Group className="form-group mb-4">
									<label className="form-label">Confirm Password</label>
									<input
										// onChange={handleChange}
										maxLength={50}
										type="password"
										{...register("confirmPassword", {
											required: true,
											// maxLength: 10,
											// onChange: handleConfirmPasswordChange,
										})}
										className={
											errors.confirmPassword?.message
												? "form-control is-invalid"
												: "form-control"
										}
									/>
									{errors.confirmPassword?.message && (
										<Form.Control.Feedback type="invalid">
											<i className="fas fa-exclamation-circle" />
											{errors.confirmPassword.message?.toString()}
										</Form.Control.Feedback>
									)}
								</Form.Group>
								<Button
									variant="dark"
									type="submit"
									disabled={
										!!(
											(
												errors.password?.message ||
												errors.confirmPassword?.message ||
												Object.keys(errors.password?.types || {}).length
											)

											// errors.password?.types
										)
									}
								>
									Reset password
								</Button>
								{serverError && (
									<div className="custom-invalid-feedback">
										<i className="fas fa-exclamation-circle"></i>
										{serverError?.toString()}
									</div>
								)}
							</form>
							<div className="cross-check">
								<h6 className="small-text">Do you remember the password?</h6>

								<Button variant="link" href="/login">
									Back to log in
								</Button>
							</div>
						</Card.Body>
					</Card>
				</Container>
			</section>
		</AmplifyTemplate>
	);
};

export default SetNewPasswordPage;
