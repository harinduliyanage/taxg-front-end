import ContentPageTemplate from "../templates/ContentPageTemplate";
import errorImg from "../../assets/images/errorImg.svg";
import { Button } from "react-bootstrap";
import "./_styles.scss";
const PageNotFound = () => {
	return (
		<ContentPageTemplate className="not-found">
			<img src={errorImg} alt="" />
			<h1>Oh no!</h1>
			<strong>We could not find what you are looking for.</strong>
			<p>You may try again or go back to the home page.</p>

			<div className="page-action">
				<Button variant="dark" onClick={() => (window.location.href = "/")}>
					Back to Home
				</Button>
				<Button variant="outline-light">Contact us</Button>
			</div>
		</ContentPageTemplate>
	);
};

export default PageNotFound;
