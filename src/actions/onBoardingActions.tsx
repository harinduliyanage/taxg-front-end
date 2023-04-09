import { Auth } from "aws-amplify";
import axios from "axios";
import { AppDispatch } from "../store";
import { PROVIDER_ONBOARDING_API, SEEKER_ONBOARDING_API } from "./endPoints";
import { headerConfig } from "./headers";
import { PROVIDER_ONBOARDING_KEY, SEEKER_ONBOARDING_KEY } from "./keys";
import {
	SEEKER_ONBOARD_SUCEESS,
	SEEKER_ONBOARD_FAILED,
	PROVIDER_ONBOARD_SUCEESS,
	PROVIDER_ONBOARD_FAILED,
} from "./types";

export const seekerOnboarding =
	(data: any) => async (dispatch: AppDispatch) => {
		const url = SEEKER_ONBOARDING_API;

		const config: any = await headerConfig();
		config.headers["x-api-key"] = SEEKER_ONBOARDING_KEY;

		return axios
			.post(url, data, config)
			.then(() => {
				dispatch({
					type: SEEKER_ONBOARD_SUCEESS,
					payload: {
						success: true,
						message: "Onboarding Success!",
						redirectUrl: "/welcomeonboarding",
					},
				});
			})
			.catch(() => {
				dispatch({
					type: SEEKER_ONBOARD_FAILED,
					payload: { error: true, message: "Api request error!" },
				});
			});
	};

export const providerOnboarding =
	(data: any) => async (dispatch: AppDispatch) => {
		const url = PROVIDER_ONBOARDING_API;
		const user = await Auth.currentSession();

		if (user && user.getIdToken().getJwtToken()) {
			const config: any = await headerConfig();
			config.headers["x-api-key"] = PROVIDER_ONBOARDING_KEY;

			return axios
				.post(url, data, config)
				.then(() => {
					dispatch({
						type: PROVIDER_ONBOARD_SUCEESS,
						payload: {
							success: true,
							message: "Onboarding Success!",
							redirectUrl: "/feed",
						},
					});
				})
				.catch(() => {
					dispatch({
						type: PROVIDER_ONBOARD_FAILED,
						payload: { error: true, message: "Api request error!" },
					});
				});
		} else {
			dispatch({
				type: PROVIDER_ONBOARD_FAILED,
				payload: { error: true, message: "Authentication failed" },
			});
		}
	};
