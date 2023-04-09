import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function Checkboxes(props) {
	const { label } = props;
	return (
		<div>
			<FormControlLabel control={<Checkbox defaultChecked />} label={label} />
		</div>
	);
}
