import {
	API_RESPONSE_SUCEESS,
	API_RESPONSE_FAILED,
	API_RESPONSE_RESET,
} from "../../actions/types";
import { ApiResponse } from "../../interfaces/reducers/ApiResponse";

const _state: ApiResponse = {
	success: false,
	error: false,
	message: "",
	redirectUrl: "",
	switchTab: "",
};

const apiReducer = (state = _state, action: any) => {
	switch (action.type) {
		case API_RESPONSE_SUCEESS:
			return {
				...state,
				...action.payload,
			};

		case API_RESPONSE_FAILED:
			return {
				...state,
				...action.payload,
			};
		case API_RESPONSE_RESET:
			return {
				success: false,
				error: false,
				message: "",
				redirectUrl: "",
				switchTab: "",
			};
		default:
			return state;
	}
};

export default apiReducer;
