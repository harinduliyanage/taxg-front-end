import "@aws-amplify/ui-react/styles.css";
import { Button, Card, Container } from "react-bootstrap";
import AmplifyTemplate from "../templates/AmplifyTemplate";

import "./_resetPassword.scss";
const handleClick = () => {
	window.location.href = "/login";
};

const PasswordResetCompletePage = () => {
	return (
		<AmplifyTemplate>
			<section className="login-journey py-7">
				<Container>
					<Card className="single-page">
						<Card.Body>
							<div className="title-section">
								<h1>Password Reset</h1>
								<p>
									Your password has been successfully reset. Click below to log
									in.
								</p>
							</div>
							<div>
								<Button variant="dark" onClick={handleClick} type="submit">
									Continue to log in
								</Button>
							</div>
						</Card.Body>
					</Card>
				</Container>
			</section>
		</AmplifyTemplate>
	);
};

export default PasswordResetCompletePage;
