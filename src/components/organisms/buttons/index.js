import React, { useState } from "react";
import "./_button.scss";

// import { Modal, ModalBody, Form, Row, Col, Button } from "react-bootstrap";
import { headerConfig } from "../../../actions/headers";

import { Modal, ModalBody, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { Auth } from "aws-amplify";

const ButtonLight = () => {
	const [inviteServiceProviderModal, setInviteServiceProvicerModal] =
		useState(false);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");

	const sendInvite = async () => {
		const { attributes } = await Auth.currentAuthenticatedUser();
		const uuid = attributes.sub;

		const body = {
			inviterUUId: uuid,
			inviteeDetails: {
				inviteeEmail: email,
				inviteeName: name,
				message: message,
			},
		};

		const config = await headerConfig();

		axios
			.post(
				`https://md77ecxb46.execute-api.us-east-1.amazonaws.com/dev/ServiceProviderInvite`,
				body,
				config
			)
			.then((res) => {
				console.log(res.data);
				setInviteServiceProvicerModal(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<> 
			<button
				type="button"
				class="btn btn-outline-light btn__primary_outline"
				onClick={() => {
					setInviteServiceProvicerModal(true);
				}}
			>
				Invite
			</button>
			<Modal show={inviteServiceProviderModal} size="lg">
				<ModalBody>
					<h3>Invite a service provider</h3>
					<Row className="mb-3">
						<Col md="6">
							<Form.Group>
								<Form.Label>Email address</Form.Label>
								<input
									type="text"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
									className="form-control"
								/>
							</Form.Group>
						</Col>
						<Col md="6">
							<Form.Group>
								<Form.Label>Name (Optional)</Form.Label>
								<input
									type="text"
									onChange={(e) => setName(e.target.value)}
									value={name}
									className="form-control"
								/>
							</Form.Group>
						</Col>
					</Row>
					<Form.Group>
						<Form.Label>Add a message (Optional)</Form.Label>
						<textarea
							rows="6"
							className="form-control"
							onChange={(e) => setMessage(e.target.value)}
							value={message}
						></textarea>
					</Form.Group>
				</ModalBody>
				<Modal.Footer>
					<Button
						variant="dark"
						onClick={() => {
							sendInvite();
						}}
					>
						Send invite
					</Button>
					<Button
						variant="outline-light"
						onClick={() => {
							setInviteServiceProvicerModal(false);
						}}
					>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
const ButtonLink = () => {
	return (
		<button type="button" class="btn btn-link ms-3">
			Ignore
		</button>
	);
};
const PrimaryButton = (props) => {
	const { label, mode, size, variant, disabled = false } = props;
	return (
		<Button size={size} className={mode} variant={variant} disabled={disabled}>
			{label}
		</Button>
	);
};

const IconButton = (props) => {
	const { variant, startIcon, label } = props;
	return (
		<Button variant={variant} startIcon={startIcon} className="icon__buttonCus">
			{label}
		</Button>
	);
};
const FileUploadButton = (props) => {
	const { label } = props;
	return (
		<Button variant="contained" component="label" className="action__button">
			{label}
			<input type="file" hidden />
		</Button>
	);
};

export { ButtonLight, ButtonLink, PrimaryButton, IconButton, FileUploadButton };
