import { FC, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Licenses from "../profile/Licenses";
import { ProfileData } from "../../../interfaces/models/ProfileData";

interface Props {
	profileData: ProfileData | null;
}

const CertificateCardView: FC<Props> = (props) => {
	const [certificateAndLicense, setCertificateAndLicense] = useState<any>([]);
	const { profileData } = props;

	useEffect(() => {
		if (profileData?.certificates?.length) {
			setCertificateAndLicense(profileData.certificates);
		}
	}, [profileData?.certificates]);

	return (
		<Card className="profile-card">
			<Card.Body>
				<>
					<div className="edit-widget">
						<h3>Certificates and licences</h3>
					</div>
				</>

				{certificateAndLicense !== null ? (
					certificateAndLicense.map((certificate: any) => {
						return (
							<div key={certificate.id}>
								<Licenses
									licenseName={certificate.certificate_name}
									licenseYear={certificate.certificate_year}
									licenseInstitute={certificate.issuing_organization}
								/>
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

export default CertificateCardView;
