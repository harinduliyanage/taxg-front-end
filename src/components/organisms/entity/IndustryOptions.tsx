import React from "react";

import AsyncSelect from "react-select/async";
import {
	industriesOption,
	industriesOptions,
} from "../../../screens/entityPage/data";

const filterIndustries = (inputValue: string) => {
	return industriesOptions.filter((i) =>
		i.label.toLowerCase().includes(inputValue.toLowerCase())
	);
};

const industriesList = (inputValue: string) =>
	new Promise<industriesOption[]>((resolve) => {
		setTimeout(() => {
			resolve(filterIndustries(inputValue));
		}, 1000);
	});

const IndustryOptions = () => (
	<AsyncSelect
		isMulti
		cacheOptions
		defaultOptions
		loadOptions={industriesList}
		classNamePrefix="taxglobal"
		className="taxglobal-select"
	/>
);

export default IndustryOptions;
