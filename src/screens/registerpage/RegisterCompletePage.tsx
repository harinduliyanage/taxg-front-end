import { Button, Container } from "react-bootstrap";
import AmplifyTemplate from "../templates/AmplifyTemplate";

import "./Style.scss";
import VerifyEmail from "../../assets/images/verify-email.svg";
import { Auth } from "aws-amplify";
import { useState } from "react";

function RegisterCompletePage() {
	const [resendMessage, setResendMessage] = useState("");
	const [resendErrorMessage, setResendErrorMessage] = useState("");

	const resendConfirmationCode = async () => {
		const username = sessionStorage.getItem("registerEmail");
		if (username) {
			await Auth.resendSignUp(username)
				.then((res) => {
					setResendMessage("Verification email re-sent to your email");
				})
				.catch((e) => {
					setResendErrorMessage("Something went wrong");
				});
		}
	};

	return (
		<AmplifyTemplate>
			<section className="login-page py-6">
				<Container>
					<div className="d-grid signup">
						<div className="signup-container verify">
							<div className="form-container">
								<div className="title-section">
									<h1>Verify your email</h1>
									<p>Check your inbox and click the link to proceed.</p>
								</div>

								<div className="image-wrapper">
									<img
										className="img-fluid"
										src={VerifyEmail}
										alt="Role Selection images"
									/>
								</div>
								<div className="form-action">
									<Button
										size="sm"
										variant="dark"
										type="submit"
										onClick={resendConfirmationCode}
									>
										Resend email
									</Button>
								</div>
								{resendMessage && <span>{resendMessage}</span>}
								{resendErrorMessage && <span>{resendErrorMessage}</span>}
								<div className="cross-check">
									<h6 className="small-text">Need help?</h6>

									<Button variant="link" href="/contact">
										Contact us
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

export default RegisterCompletePage;
