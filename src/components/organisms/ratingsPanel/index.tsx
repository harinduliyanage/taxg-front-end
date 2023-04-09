import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function BasicRating() {
  const [value, setValue] = React.useState<number | null>(4);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2, marginTop: 4 },
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{ color: "#007B5C" }}
      />
    </Box>
  );
}
