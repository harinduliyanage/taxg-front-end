import { FC } from "react";
import { Button, ListGroup } from "react-bootstrap";
import RoleImage from "../../../assets/images/role-selection-graphic.svg";
import HelpSelection from "./HelpSelection";
interface Props {
	setWizardStep: (arg: string) => void;
}

const WelcomeSection: FC<Props> = (props) => {
	const { setWizardStep } = props;

	return (
		<div className="container">
			<div className="roll-selection">
				<div className="title-section">
					<h1 className="mb-2">Welcome to Taxglobal</h1>
					<h3 className="mb-0">
						Let's make a profile that helps you accomplish more professionally
					</h3>
				</div>

				<div className="image-wrapper">
					<img
						className="img-fluid"
						src={RoleImage}
						alt="Role Selection images"
					/>
				</div>

				<p className="mb-0">
					How would you like to advance your profile?
					<br />
					This will help us guide you.
				</p>

				<div className="role-selection">
					<ListGroup>
						<ListGroup.Item>
							<Button
								variant="outline-light"
								onClick={() => setWizardStep("customer")}
							>
								I'm looking for service
							</Button>
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								variant="outline-light"
								onClick={() => setWizardStep("provider")}
							>
								I'm providing service
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</div>

				<div className="onboarding-footer">
					<p>
						Not sure on what to pick?{" "}
						<HelpSelection />
					</p>
				</div>
			</div>
		</div>
	);
};

export default WelcomeSection;
