import { combineReducers } from "redux";
import apiReducer from "./apiReducer";
import AuthReducer from "./authReducer";
import MasterData from "./entityReducer";
import OnboardReducer from "./onboardReducer";

export default combineReducers({
	auth: AuthReducer,
	onboarding: OnboardReducer,
	apiResponse: apiReducer,
	masterData: MasterData,
});
