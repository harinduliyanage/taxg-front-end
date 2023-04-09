import { useState } from "react";
import CheckEmailPage from "./CheckEmailPage";
import EnterEmailPage from "./EnterEmailPage";

const ResetPasswordPage = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [email, setEmail] = useState("");

	if (currentStep === 0) {
		return (
			<EnterEmailPage
				onStepChange={(step: number, email?: string) => {
					setCurrentStep(step);
					if (email) setEmail(email);
				}}
			></EnterEmailPage>
		);
	}

	if (currentStep === 1) {
		return (
			<CheckEmailPage
				onStepChange={(step: number) => setCurrentStep(step)}
				email={email}
			></CheckEmailPage>
		);
	}

	return <div></div>;
};

export default ResetPasswordPage;
