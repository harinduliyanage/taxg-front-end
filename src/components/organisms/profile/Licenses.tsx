import React, { FC } from "react";
import "./_license.scss";

interface LicensesProps {
	licenseName?: string;
	licenseYear?: string;
	licenseInstitute?: string;
}

const Licenses: FC<LicensesProps> = ({
	licenseName,
	licenseYear,
	licenseInstitute,
}) => {
	return (
		<div className="license-item">
			<h5>{licenseName && licenseName}</h5>
			{licenseYear && <div className="year">{licenseYear}</div>}
			{licenseInstitute && <div className="institute">{licenseInstitute}</div>}
		</div>
	);
};

export default Licenses;
