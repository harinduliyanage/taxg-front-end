import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
function CateggeriesSeach({ setSearchQuery, searchDiscovers, searchQuery }) {
  const navigator = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigator(`/discover/services/keyword/${searchQuery}`);
    } else {
      searchDiscovers(null);
    }
  };
  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#F1F2F3",
          border: "1px solid #E4E5E7",
          boxShadow: "none",
        }}
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon style={{ color: "#007B5C" }} />
        </IconButton>
        <InputBase
          type="search"
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search or ask questions"
          inputProps={{ "aria-label": "search google maps" }}
          onKeyPress={(e) => {
            e.key === "Enter" && onSubmitHandler(e);
          }}
          onInput={(e) => {
            setSearchQuery(e.target.value);
          }}
          value={searchQuery}
        />
      </Paper>
    </>
  );
}

export default CateggeriesSeach;
