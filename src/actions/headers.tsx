import { Auth } from "aws-amplify";

type Header = {
	"Content-type": string;
	Authorization?: string;
	"x-api-key"?: string;
};

type Config = {
	headers: Header;
};

export const headerConfig = async () => {
	// Get token from local storage
	const user = await Auth.currentSession();
	// Header
	const config: Config = {
		headers: {
			"Content-type": "application/json",
		},
	};
	// If token add to header
	if (user && user.getIdToken().getJwtToken()) {
		config.headers["Authorization"] = `Bearer ${user
			.getIdToken()
			.getJwtToken()}`;
	}

	return config;
};
