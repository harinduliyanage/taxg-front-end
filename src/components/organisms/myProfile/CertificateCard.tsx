import { FC, useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import Licenses from "../profile/Licenses";
import { List, arrayMove } from "react-movable";
import { ProfileData } from "../../../interfaces/models/ProfileData";
import { Auth } from "aws-amplify";
import { headerConfig } from "../../../actions/headers";
import axios from "axios";
import { USER_DATA_API } from "../../../actions/endPoints";
import ModalCertificates from "../modal/ModalCertificates";

interface Props {
	profileData: ProfileData | null;
	getInformation: () => void;
}

type CertificateType = {
	name: string;
	year: string;
	organization: string;
	sortOrder: number;
};

const CertificateCard: FC<Props> = (props) => {
	const [enableCertEditButton, setEnableCertEditButton] = useState(false);
	const [certificateAndLicense, setCertificateAndLicense] = useState<any>([]);
	const [items, setItems] = useState(["item1"]);
	const [showEditCertificateModal, setShowEditCertificateModal] =
		useState(false);
	const [showRemoveCertificateModal, setShowRemoveCertificateModal] =
		useState(false);
	const [editingCertificate, setEditingCertificate] =
		useState<CertificateType | null>(null);
	const [selectCertId, setSelectCertId] = useState("");

	const { profileData, getInformation } = props;

	useEffect(() => {
		if (profileData?.certificates?.length) {
			setCertificateAndLicense(profileData.certificates);
		}
	}, [profileData?.certificates]);

	const updateCertificate = (
		elementName: "name" | "year" | "organization",
		elementVal: string
	) => {
		const updateCertificate = editingCertificate;
		if (updateCertificate !== null) {
			updateCertificate[elementName] = elementVal;
			setEditingCertificate(updateCertificate);
		}
	};

	const handleClose = () => {
		setShowEditCertificateModal(false);
		setShowRemoveCertificateModal(false);
	};

	const saveCertificate = async () => {
		const { attributes } = await Auth.currentAuthenticatedUser();
		const uuid = attributes.sub;

		const body = {
			uuid: uuid,
			certificates: [
				{
					status: 2,
					certID: selectCertId,
					sortOrderNumber: editingCertificate?.sortOrder,
					certName: editingCertificate?.name,
					certificate_year: editingCertificate?.year,
					issuingOrg: editingCertificate?.organization,
				},
			],
		};

		const config: any = await headerConfig();

		axios
			.post(`${USER_DATA_API}/Certificates`, body, config)
			.then(() => {
				getInformation();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const removeCertificate = async () => {
		const { attributes } = await Auth.currentAuthenticatedUser();
		const uuid = attributes.sub;

		const body = {
			uuid: uuid,
			certificates: [
				{
					status: 3,
					certID: selectCertId,
					sortOrderNumber: 0,
					certName: "",
					certificate_year: "",
					issuingOrg: "",
				},
			],
		};

		const config: any = await headerConfig();

		axios
			.post(`${USER_DATA_API}/Certificates`, body, config)
			.then((res) => {
				getInformation();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Card className="profile-card">
			<Modal show={showEditCertificateModal}>
				<Modal.Body>
					<form id="editCertificate">
						<div className="form-layout">
							<h3>Edit certificate or licence</h3>
							<Row>
								<Col md="8">
									<Form.Group>
										<Form.Label>Name</Form.Label>
										<Form.Control
											type="text"
											onChange={(e) => {
												updateCertificate("name", e.target.value);
											}}
											defaultValue={editingCertificate?.name}
										/>
									</Form.Group>
								</Col>
								<Col md="4">
									<Form.Group>
										<Form.Label>Year</Form.Label>
										<Form.Control
											type="text"
											onChange={(e) => {
												updateCertificate("year", e.target.value);
											}}
											defaultValue={editingCertificate?.year}
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Form.Group as={Col}>
									<Form.Label>Issuing organization</Form.Label>
									<Form.Control
										type="text"
										onChange={(e) => {
											updateCertificate("organization", e.target.value);
										}}
										defaultValue={editingCertificate?.organization}
									/>
								</Form.Group>
							</Row>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="dark"
						onClick={() => {
							saveCertificate();
							setShowEditCertificateModal(false);
						}}
					>
						Save Changes
					</Button>
					<Button variant="outline-light" onClick={handleClose}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={showRemoveCertificateModal}>
				<Modal.Body>
					<h3>Are you sure?</h3>
					<p>
						You are about to remove a certificate/licence and this action cannot
						be undone. Press cancel to go back.
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="danger"
						onClick={() => {
							removeCertificate();
							setShowRemoveCertificateModal(false);
						}}
					>
						Remove
					</Button>
					<Button variant="outline-light" onClick={handleClose}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>

			<Card.Body>
				{enableCertEditButton ? (
					<div className="edit-widget">
						<div className="back-nav">
							<Button
								variant="link"
								onClick={() => {
									setEnableCertEditButton(false);
								}}
							>
								<i className="fal fa-long-arrow-left"></i>
							</Button>
							<h3>Certificates and licences</h3>
						</div>
						<ModalCertificates getInformation={getInformation} />
					</div>
				) : (
					<>
						<div className="edit-widget">
							<h3>Certificates and licences</h3>
							<Button
								variant="outline-light"
								size="sm"
								onClick={() => {
									setEnableCertEditButton(true);
								}}
							>
								<i className="fas fa-pencil" /> Edit
							</Button>
						</div>
					</>
				)}

				{certificateAndLicense !== null ? (
					certificateAndLicense.map((certificate: any) => {
						return (
							<div key={certificate.id}>
								{enableCertEditButton ? (
									<List
										values={items}
										onChange={({ oldIndex, newIndex }) =>
											setItems(arrayMove(items, oldIndex, newIndex))
										}
										renderList={({ children, props }) => (
											<div className="sort-wrapper" {...props}>
												{children}
											</div>
										)}
										renderItem={({ props }: any) => (
											<div {...props}>
												<div className="sort-item">
													<Licenses
														key={certificate.id}
														licenseName={certificate.certificate_name}
														licenseYear={certificate.certificate_year}
														licenseInstitute={certificate.issuing_organization}
													/>
													<div className="edit-row">
														<Button
															variant="outline-light"
															size="sm"
															onClick={() => {
																setShowEditCertificateModal(true);
																setSelectCertId(certificate.id);
																setEditingCertificate({
																	name: certificate.certificate_name,
																	year: certificate.certificate_year,
																	organization:
																		certificate.issuing_organization,
																	sortOrder: certificate.sort_order_number,
																});
															}}
														>
															Edit
														</Button>
														<Button
															variant="outline-danger"
															size="sm"
															onClick={() => {
																setShowRemoveCertificateModal(true);
																setSelectCertId(certificate.id);
															}}
														>
															Remove
														</Button>
													</div>
												</div>
											</div>
										)}
									/>
								) : (
									<Licenses
										licenseName={certificate.certificate_name}
										licenseYear={certificate.certificate_year}
										licenseInstitute={certificate.issuing_organization}
									/>
								)}
							</div>
						);
					})
				) : (
					<></>
				)}
			</Card.Body>
		</Card>
	);
};

export default CertificateCard;
