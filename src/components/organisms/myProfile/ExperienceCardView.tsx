import { FC, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { ProfileData } from "../../../interfaces/models/ProfileData";
import Experience from "../profile/Experience";

interface Props {
	profileData: ProfileData | null;
}

const ExperienceCardView: FC<Props> = (props) => {
	const [experiences, setExperiences] = useState<any>([]);
	const { profileData } = props;

	useEffect(() => {
		if (profileData?.work_experinces?.length) {
			setExperiences(profileData.work_experinces);
		}
	}, [profileData?.work_experinces]);

	return (
		<Card className="profile-card">
			<Card.Body>
				<>
					<div className="edit-widget">
						<h3>Experience</h3>
					</div>
				</>

				{experiences !== null &&
					experiences.map((work_experience: any) => {
						return (
							<div key={work_experience.id}>
								<Experience
									key={work_experience.id}
									companyName={work_experience.company}
									position={work_experience.title}
									start={work_experience.start_date}
									end={work_experience.end_date}
									employmentType={work_experience.employment_type}
								>
									<p>{work_experience.introduction}</p>
								</Experience>
							</div>
						);
					})}
			</Card.Body>
		</Card>
	);
};

export default ExperienceCardView;
