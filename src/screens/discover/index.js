import SuggestedProfileCards from "../../components/organisms/profiles/suggestedProfiles";
import { useState, useEffect } from "react";

import "./_DiscoverPage.scss";
import PageTemplate from "../templates/PageTemplate";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Spinner } from "react-bootstrap";

function DiscoverPage() {
  const [suggestedServiceProviders, setSuggestedServiceProviders] =
    useState(null);
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    navigator(`/discover/services/keyword/${searchQuery}`);
  };

  const navigator = useNavigate();

  useEffect(() => {
    searchDiscovers(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function searchDiscovers(searchQuery) {
    const { attributes } = await Auth.currentAuthenticatedUser();
    setIsLoading(true);
    await axios
      .get(
        `https://22qzdzicjh.execute-api.us-east-1.amazonaws.com/dev/ServiceProviders/${attributes.sub}?page=1.25`
      )
      .then(async (res) => {
        setSuggestedServiceProviders(
          res.data.results.recommendations !== undefined &&
            Object.keys(res.data.results.recommendations).length === 0
            ? null
            : res.data.results.recommendations
        );
        console.log("response data 1 :", res.data.results.recommendations);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <PageTemplate>
      <div style={{ backgroundColor: "#fff" }}>
        <div className="container">
          <div class="row justify-content-center p-cus-1">
            <div class="col-md-8">
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
                  placeholder="Search for service providers"
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
      <div className="container">
        <div className="row pt-5">
          <div className="col-8">
            <p className="heading">Some suggestions for you</p>
          </div>
          <div className="col-4 aligment">
            {/* <a className="link__button" href="./discover.page.js">View All</a> */}
            <a
              className="text-secondary"
              href="/discover/viewallsuggestedproviders"
            >
              View all
            </a>
          </div>
        </div>
        {!isLoading ? (
          <SuggestedProfileCards
            suggestedServiceProviders={suggestedServiceProviders}
          />
        ) : (
          <div className="page-loader">
            <Spinner animation="border" />
          </div>
        )}
      </div>
    </PageTemplate>
  );
}

export default DiscoverPage;
