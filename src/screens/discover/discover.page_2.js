import { Chip } from "@mui/material";
import { useState, useEffect } from "react";
// import CateggeriesSeach from "../../components/organisms/categories_search";
import Jumbotron from "../../components/organisms/jumbotron";
import ProfileRatingCard from "../../components/organisms/profileCard";
import AmplifyTemplate from "../templates/AmplifyTemplate";
import "./_DiscoverPage.scss";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function DiscoverPagee() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { id } = useParams();

  const navigator = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (searchQuery.startsWith("looking for")) {
      console.log("array : ", searchQuery.split("looking for")[1]);
      let temp = searchQuery.split("looking for ")[1];
      navigator(`/discover/services/results/${temp}`);
    } else {
      navigator(`/discover/services/keyword/${searchQuery}`);
    }
  };

  useEffect(() => {
    searchByCategory(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page]);

  async function searchByCategory() {
    setIsLoading(true);
    await axios
      .get(
        `https://eeizq5dpte.execute-api.us-east-1.amazonaws.com/dev/ServiceProviderSearch/${id}?page=${page}`
      )
      .then(async (res) => {
        setData(
          res.data.results !== undefined &&
            Object.keys(res.data.results).length === 0
            ? null
            : res.data.results
        );

        setIsLoading(false);
        console.log("data :", res.data);
        setPageCount(Math.ceil(res.data.dataCount / 10));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleNextPage = () => {
    setPage(page + 1);
    searchByCategory(id);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
    searchByCategory(id);
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    searchByCategory(id);
  };

  return (
    <AmplifyTemplate>
      <div className="bg-white">
        <div className="container">
          <div className="row justify-content-center p-cus-3">
            <div className="col-md-12 g-0">
              {/* <CateggeriesSeach /> */}
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
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
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
                />
              </Paper>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="row ">
          <Jumbotron />
        </div>
        <div className="row">
          <div className="col-5 g-0 filters-panel">
            <h3 className="heading">Filter by category</h3>
            <div className="categories">
              <Chip
                className="mui__chip"
                label="Tax advisers"
                onClick={() => {
                  let temp = "Taxadvisers";
                  navigator(`/discover/services/results/${temp}`);
                }}
              />
              <Chip
                className="mui__chip"
                label="Accountants"
                onClick={() => {
                  let temp = "Accountants";
                  navigator(`/discover/services/results/${temp}`);
                }}
              />
              <Chip
                className="mui__chip"
                label="CPAs"
                onClick={() => {
                  // let temp = "CPAs";
                  navigator(`/discover/services/results$/{temp}`);
                }}
              />
              <Chip
                className="mui__chip"
                label="Tax attorneys"
                onClick={() => {
                  // let temp = "Taxattorneys";
                  navigator(`/discover/services/results$/{temp}`);
                }}
              />
            </div>
            <div>{/* <SelectBox /> */}</div>
            <div style={{ display: "flex" }}>
              {/* <Checkboxes label="People" /> */}
              {/* <Checkboxes label="Companies" /> */}
            </div>
          </div>
          <div className="col-7 g-0 results-panel">
            {!isLoading && <ProfileRatingCard data={data} />}
            <div>
              {/* Render data here */}
              <Pagination
                activePage={page}
                itemsCountPerPage={10}
                pageRangeDisplayed={5}
              >
                <Pagination.Prev
                  disabled={page === 1}
                  onClick={handlePrevPage}
                />
                {Array.from(Array(pageCount).keys()).map((i) => {
                  return (
                    <Pagination.Item
                      key={i}
                      onClick={() => handlePageClick(i + 1)}
                      active={i + 1 === page}
                    >
                      {i + 1}
                    </Pagination.Item>
                  );
                })}
                <Pagination.Next
                  disabled={page === pageCount}
                  onClick={handleNextPage}
                />
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </AmplifyTemplate>
  );
}

export default DiscoverPagee;
