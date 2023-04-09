import axios from "axios";
import { headerConfig } from "./headers";
import { UPDATE_USER_STATUS_KEY } from "./keys";

export const updateuserStatus = async (data: any) => {
	const url =
		"https://0mjlv6k1nc.execute-api.us-east-1.amazonaws.com/saveUserStatus/";

	const config: any = await headerConfig();
	config.headers["x-api-key"] = UPDATE_USER_STATUS_KEY;

	const res = await axios.post(url, data, config);

	return res;
};

export const getuserStatus = async (uuid: string) => {
	const url =
		"https://4rivhcrxyg.execute-api.us-east-1.amazonaws.com/dev/user-profile-details-status/" +
		uuid;

	const config: any = await headerConfig();
	// config.headers["x-api-key"] = GET_USER_STATUS_KEY;
	// config.params = {
	// 	userId: null,
	// };
	// config.params.userId = uuid;
	const data = await axios.get(url, config);
	return data;
};
