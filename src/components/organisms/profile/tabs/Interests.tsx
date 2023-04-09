import React, { FC, useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";

import Select from "react-select";

import linkedInIcon from "../../../../assets/images/social-media-linkedin.svg";
import { Auth } from "aws-amplify";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { saveInterests } from "../../../../actions/profileActions";
import { ProfileInterestsRequest } from "../../../../interfaces/actions/ProfileInterestsRequest";
import axios from "axios";
import { USER_INTERESTS_KEY } from "../../../../actions/keys";
import { ProfileData } from "../../../../interfaces/models/ProfileData";
import { ApiResponse } from "../../../../interfaces/reducers/ApiResponse";
import { API_RESPONSE_RESET } from "../../../../actions/types";

interface Props {
	profileData: ProfileData | null;
}

type IntrestData = {
	id: number;
	label: string;
};

type SavedIntrestData = {
	userInterestID: number;
	userInterest: string;
};

const Interests: FC<Props> = (props) => {
	const [interestsList, setInterestsList] = useState([]);
	const [selectedInterests, setSelectedInterests] = useState<IntrestData[]>([]);
	const [selectedInterestIds, setSelectedInterestIds] = useState<number[]>([]);
	const [apierror, setApiError] = useState("");
	const [type, setType] = useState("");

	const { success, error, message }: ApiResponse = useAppSelector(
		(state) => state.apiResponse
	);
	const { profileData } = props;

	useEffect(() => {
		if (success === true && type === "interests") {
			window.location.href = "/feed";
		}
	}, [success, type]);

	useEffect(() => {
		if (error === true) setApiError(message);
	}, [error, message]);

	useEffect(() => {
		async function fetchData() {
			const config = {
				Accept: "application/json",
				"x-api-key": USER_INTERESTS_KEY,
			};

			await axios
				.get(
					"https://fpkarsvfsh.execute-api.us-east-1.amazonaws.com/userInterestsList",
					{
						headers: config,
					}
				)
				.then((res: any) => {
					setInterestsList(res.data);
				})
				.catch((error: any) => {
					console.log(error);
				});
		}
		if (interestsList.length === 0) {
			fetchData();
		}
	}, [interestsList]);

	useEffect(() => {
		if (profileData !== null && interestsList.length > 0) {
			if (profileData.Interests && profileData.Interests.length) {
				const answers: IntrestData[] = [];
				// const answerIds = [];
				interestsList.forEach((element: SavedIntrestData) => {
					if (profileData.Interests.includes(element.userInterestID)) {
						answers.push({
							id: element.userInterestID,
							label: element.userInterest,
						});
						// answerIds.push(element.userInterestID)
					}
				});
				setSelectedInterests(answers);
				setSelectedInterestIds(profileData.Interests);
			}
		}
	}, [profileData, interestsList]);

	const dispatch = useAppDispatch();

	const onSkip = () => {
		window.location.href = "/feed";
	};

	const onInterestsSubmit = async () => {
		if (selectedInterestIds.length === 0) {
			setApiError("Please select at least one interest.");
		} else {
			dispatch({ type: API_RESPONSE_RESET });
			const { attributes } = await Auth.currentAuthenticatedUser();
			const data: ProfileInterestsRequest = {
				uuid: attributes.sub,
				interests: selectedInterestIds,
			};

			dispatch(saveInterests(data));
			setType("interests");
		}
	};

	const handleChange = (val: any) => {
		setSelectedInterests([
			...selectedInterests,
			{ id: val.value, label: val.label },
		]);
		setSelectedInterestIds([...selectedInterestIds, val.value]);
	};

	const renderInterests = (service: IntrestData) => {
		return (
			<Badge
				key={service.id}
				bg="gray-500"
				style={{ marginTop: "10px", marginRight: "10px" }}
			>
				{service.label}
				<i
					className="fal fa-times"
					style={{ marginLeft: "10px" }}
					onClick={() => removeInterest(service)}
				/>
			</Badge>
		);
	};

	const removeInterest = (service: IntrestData) => {
		const filteredStates = selectedInterests.filter(
			(item) => item.label !== service.label
		);
		const filteredStateIds = selectedInterestIds.filter(
			(item) => item !== service.id
		);
		setSelectedInterests(filteredStates);
		setSelectedInterestIds(filteredStateIds);
	};

	return (
		<>
			<Select
				options={interestsList.map((option: any) => ({
					value: option.userInterestID,
					label: option.userInterest,
				}))}
				onChange={(value: any) => handleChange(value)}
			/>

			{selectedInterests.length > 0 ? (
				<div className="badge-group">
					{selectedInterests.map((interest: IntrestData) => {
						return renderInterests(interest);
					})}
				</div>
			) : null}

			<div className="progress-action">
				<Button variant="dark" size="sm" onClick={onInterestsSubmit}>
					Continue
				</Button>
				<Button variant="outline-light" size="sm" onClick={onSkip}>
					Skip
				</Button>
				<Button
					variant="outline-light"
					size="sm"
					onClick={() => (window.location.href = "/feed")}
				>
					Cancel
				</Button>
				<Button
					variant="outline-light"
					size="sm"
					className="ms-auto me-0 import-linkedin"
					disabled
				>
					<img src={linkedInIcon} alt="linkedin" /> Import from LinkedIn
				</Button>
			</div>
			{apierror.length > 0 && (
				<div className="custom-invalid-feedback">
					<i className="fas fa-exclamation-circle" />
					{apierror?.toString()}
				</div>
			)}
		</>
	);
};

export default Interests;
