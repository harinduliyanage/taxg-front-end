import React from "react";

import AsyncSelect from "react-select/async";
import { FlavourOption, flavourOptions } from "./data";

const filterColors = (inputValue: string) => {
	return flavourOptions.filter((i) =>
		i.label.toLowerCase().includes(inputValue.toLowerCase())
	);
};

const promiseOptions = (inputValue: string) =>
	new Promise<FlavourOption[]>((resolve) => {
		setTimeout(() => {
			resolve(filterColors(inputValue));
		}, 1000);
	});

const ProfileIntrests = () => (
	<AsyncSelect
		isMulti
		cacheOptions
		defaultOptions
		loadOptions={promiseOptions}
	/>
);

export default ProfileIntrests;
