import {
	PROVIDER_ONBOARD_FAILED,
	PROVIDER_ONBOARD_SUCEESS,
	SEEKER_ONBOARD_FAILED,
	SEEKER_ONBOARD_SUCEESS,
} from "../../actions/types";
import { Onboard } from "../../interfaces/reducers/Onboard";

const _state: Onboard = {
	success: false,
	error: false,
	message: "",
	redirectUrl: "",
};

const OnboardReducer = (state = _state, action: any) => {
	switch (action.type) {
		case SEEKER_ONBOARD_SUCEESS:
			return {
				...state,
				...action.payload,
			};

		case SEEKER_ONBOARD_FAILED:
			return {
				...state,
				...action.payload,
			};
		case PROVIDER_ONBOARD_SUCEESS:
			return {
				...state,
				...action.payload,
			};
		case PROVIDER_ONBOARD_FAILED:
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
};

export default OnboardReducer;
