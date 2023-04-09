import React, { FC } from "react";
import "./_experience.scss";
import companyDefault from "../../../assets/images/company_default.svg";

interface ExperienceProps {
	imageURL?: string;
	companyName?: string;
	position?: string;
	start?: string;
	end?: string;
	employmentType?: string;
	children?: JSX.Element | JSX.Element[];
}

const Experience: FC<ExperienceProps> = ({
	imageURL,
	companyName,
	position,
	children,
	start,
	end,
	employmentType,
}) => {
	let startYear = null;
	if (start) {
		startYear = start.split("-")[0];
	}
	let endYear = " to present";
	if (end) {
		endYear = "-" + end.split("-")[0];
	}
	return (
		<div className="experience-item">
			<div className="experience-item-company">
				<div className="company-logo">
					<img src={imageURL} alt={companyName && companyName} />
				</div>
				<div className="company-name">
					{position && <h5>{position}</h5>}
					{companyName && <span className="name">{companyName}</span>}
					{startYear && (
						<p className="name">{`${startYear}${endYear} . ${employmentType}`}</p>
					)}
				</div>
			</div>
			<div className="about-roll">{children}</div>
		</div>
	);
};

Experience.defaultProps = {
	imageURL: companyDefault,
};

export default Experience;
