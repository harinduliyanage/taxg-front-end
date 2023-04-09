import axios from "axios";
import { ProfileInterestsRequest } from "../interfaces/actions/ProfileInterestsRequest";
import { ProfileIntroRequest } from "../interfaces/actions/ProfileIntroRequest";
import { AppDispatch } from "../store";
import {
	USER_INTERESTS_API,
	USER_INTRO_API,
	USER_WORK_EXPERIENCE_API,
} from "./endPoints";
import { headerConfig } from "./headers";
import { API_RESPONSE_SUCEESS, API_RESPONSE_FAILED } from "./types";

export const userIntro =
	(data: ProfileIntroRequest) => async (dispatch: AppDispatch) => {
		const url = USER_INTRO_API;
		const config: any = await headerConfig();

		return axios
			.post(url, data, config)
			.then(() => {
				dispatch({
					type: API_RESPONSE_SUCEESS,
					payload: {
						success: true,
						message: "Introduction and title update success!",
						switchTab: "experience",
					},
				});
			})
			.catch(() => {
				dispatch({
					type: API_RESPONSE_FAILED,
					payload: { error: true, message: "Something went wrong!" },
				});
			});
	};

export const saveWorkExperience =
	(data: any) => async (dispatch: AppDispatch) => {
		const url = USER_WORK_EXPERIENCE_API;
		const config: any = await headerConfig();

		return axios
			.post(url, data, config)
			.then(() => {
				dispatch({
					type: API_RESPONSE_SUCEESS,
					payload: {
						success: true,
						message: "work experience update success!",
						switchTab: "interest",
					},
				});
			})
			.catch(() => {
				dispatch({
					type: API_RESPONSE_FAILED,
					payload: { error: true, message: "Something went wrong!" },
				});
			});
	};

export const saveInterests =
	(data: ProfileInterestsRequest) => async (dispatch: AppDispatch) => {
		const url = USER_INTERESTS_API;
		const config: any = await headerConfig();

		return axios
			.post(url, data, config)
			.then(() => {
				dispatch({
					type: API_RESPONSE_SUCEESS,
					payload: {
						success: true,
						message: "work experience update success!",
						switchTab: "discover",
					},
				});
			})
			.catch(() => {
				dispatch({
					type: API_RESPONSE_FAILED,
					payload: { error: true, message: "Something went wrong!" },
				});
			});
	};
