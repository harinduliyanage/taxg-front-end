import { Auth } from "aws-amplify";

import "@aws-amplify/ui-react/styles.css";
import { Button, Card, Container } from "react-bootstrap";
import AmplifyTemplate from "../templates/AmplifyTemplate";
import React, { FC } from "react";
import "./_resetPassword.scss";

type CheckEmailPageProps = {
	email: string;
	onStepChange: (step: number, email?: string) => void;
};

const CheckEmailPage: FC<CheckEmailPageProps> = ({ email, onStepChange }) => {
	const resendEmail = () => {
		Auth.forgotPassword(email)
			.then((res) => {
				onStepChange(1);
			})
			.catch((err) => console.log(err));
	};

	return (
		<AmplifyTemplate>
			<section className="login-journey py-7">
				<Container>
					<Card className="single-page">
						<Card.Body>
							<div className="title-section">
								<h1>Check your email</h1>
								<p>We sent a password reset link to {email}</p>
							</div>
							<form id="resetForm">
								<p className="text-small">Didn’t receive the email?</p>
								<Button
									variant="dark"
									onClick={resendEmail}

									// disabled={!!errors.email?.message}
								>
									Resend email
								</Button>
								{/* {serverError && (
                    <div className="custom-invalid-feedback">
                      <i className="fas fa-exclamation-circle"></i>
                      {serverError?.toString()}
                    </div>
                  )} */}
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

export default CheckEmailPage;
