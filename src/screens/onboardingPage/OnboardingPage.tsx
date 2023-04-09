import { Auth } from "aws-amplify";
import React, { useEffect } from "react";
import { getuserStatus } from "../../actions/userStatusActions";
import CustomerBusiness from "../../components/organisms/onboarding/CustomerBusiness";
import HelpSelection from "../../components/organisms/onboarding/HelpSelection";
import ProviderBusiness from "../../components/organisms/onboarding/ProviderBusiness";
import WelcomeSection from "../../components/organisms/onboarding/WelcomeSection";
import PageTemplate from "../templates/PageTemplate";

import "./_OnboardingPage.scss";

const OnboardingPage = () => {
	const [step, setStep] = React.useState("");
	const [checkUserStatus, setUserStatus] = React.useState(-1);
	const [userRoleId, setUserRole] = React.useState(0);

	useEffect(() => {
		async function fetchData() {
			const { attributes } = await Auth.currentAuthenticatedUser();
			const userStatus = await getuserStatus(attributes.sub);

			if (userStatus.data.results.length) {
				const user = userStatus.data.results[0];
				setUserStatus(user.status_id);
				setUserRole(user.role_type_id);
			}
		}

		fetchData();
	}, []);

	const setWizardStep = (stepname: string) => {
		setStep(stepname);
	};

	if (checkUserStatus === 2 || checkUserStatus === 4) {
		if (userRoleId === 2) {
			window.location.href = "/discover";
		} else {
			window.location.href = "/feed";
		}
	}
	if (checkUserStatus === 3) {
		return (
			<PageTemplate>
				<div className="onboarding-page py-6">
					{step === "" && <WelcomeSection setWizardStep={setWizardStep} />}

					{step === "help" && <HelpSelection />}

					{step === "customer" && (
						<CustomerBusiness setWizardStep={setWizardStep} />
					)}

					{step === "provider" && (
						<ProviderBusiness setWizardStep={setWizardStep} />
					)}
				</div>
			</PageTemplate>
		);
	}

	return <></>;
};

export default OnboardingPage;
