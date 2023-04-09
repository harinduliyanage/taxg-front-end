import { Auth } from "aws-amplify";
import axios from "axios";
import { useEffect } from "react";
import { headerConfig } from "../../actions/headers";
import { getuserStatus } from "../../actions/userStatusActions";

function AuthProcessingPage() {
	useEffect(() => {
		const fetchData = async () => {
			const user = await Auth.currentAuthenticatedUser();
			const userStatus = await getuserStatus(user.attributes.sub);

			if (userStatus.data.success === 0) {
				const config = await headerConfig();
				const body = {
					userProfileImage: "",
					uuid: user.attributes.sub,
					userEmail: user.attributes.email,
					userFirstName: user.attributes.name,
					userLastName: user.attributes[`custom:lastname`],
					role_type_id: 0,
					status_id: 0,
					profile_type: "Standed",
				};
				await axios.post(
					"https://4rivhcrxyg.execute-api.us-east-1.amazonaws.com/dev/BasicUserDetails",
					body,
					config
				);
				window.location.href = "/onboarding";
			} else if (userStatus.data.results.length) {
				const userInfo = userStatus.data.results[0];
				if (userInfo.status_id === 3) {
					window.location.href = "/onboarding";
				} else if (userInfo.status_id === 0 || userInfo.status_id === 1) {
					window.location.href = "/register/moreinfo";
				} else if (userInfo.status_id === 2) {
					if (userInfo.role_type_id === 1) {
						window.location.href = "/feed";
					} else {
						window.location.href = "/discover";
					}
				}
			} else {
				window.location.href = "/onboarding";
			}
		};

		fetchData().catch(console.error);
	}, []);

	return <div>Processing</div>;
}

export default AuthProcessingPage;
