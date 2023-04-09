import React, {FC, useState} from "react";
import { Button, Modal } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import './_help.scss';
interface Props {

}

const HelpSelection: FC<Props> = (props) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="link" onClick={handleShow}>
				Learn more
			</Button>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}

				centered={true}
				className="help-modal"
			>
				<Modal.Header closeButton>

				</Modal.Header>
				<Modal.Body>
					<Accordion defaultActiveKey="0">
						<Accordion.Item eventKey="0">
							<Accordion.Header>I am looking for services</Accordion.Header>
							<Accordion.Body>
								I am an individual/company looking for a tax firm to engage!
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="1">
							<Accordion.Header>I am providing services</Accordion.Header>
							<Accordion.Body>
								I am a Tax Professional/Tax Firm offering services for customers!
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</Modal.Body>
			</Modal>

		</>
	);
};

export default HelpSelection;
