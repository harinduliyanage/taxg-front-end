import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
function SelectBox() {
	return (
		<FormControl sx={{ minWidth: "80%" }}>
			<Select
				//value={age}
				//onChange={handleChange}
				displayEmpty
				inputProps={{ "aria-label": "Without label" }}
			>
				<MenuItem value="">
					<em>Select</em>
				</MenuItem>
				<MenuItem value={10}>Ten</MenuItem>
				<MenuItem value={20}>Twenty</MenuItem>
				<MenuItem value={30}>Thirty</MenuItem>
			</Select>
		</FormControl>
	);
}

export default SelectBox;
