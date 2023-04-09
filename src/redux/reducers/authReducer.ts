import {
	USER_SIGNOUT_FAILURE,
	USER_SIGNOUT_SUCCESS,
	USER_SIGNOUT_INIT,
	SET_USER_SUCCESS,
	SET_USER_FAILURE,
} from "../constants";

const _state = {
	user: null,
	loading: true,
	error: "",
};

const AuthReducer = (state = _state, action: any) => {
	switch (action.type) {
		case SET_USER_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload,
			};
		case SET_USER_FAILURE:
			return {
				...state,
				loading: false,
				error: "Error while setting the user token",
			};

		case USER_SIGNOUT_INIT:
			return {
				user: null,
				loading: true,
				error: "",
			};

		case USER_SIGNOUT_FAILURE:
			return {
				...state,
				loading: false,
				error: "Error while signing out the user",
			};

		case USER_SIGNOUT_SUCCESS:
			localStorage.removeItem("feedToken");
			return {
				...state,
				loading: false,
				user: null,
			};

		default:
			return state;
	}
};

export default AuthReducer;
