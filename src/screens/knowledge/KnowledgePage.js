import { useState } from "react";

// import "./_DiscoverPage.scss";
import "./knowledgeresultsadd.scss";
import PageTemplate from "../templates/PageTemplate";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import pageImg from "../../assets/images/learn-graphic.svg";
import { useNavigate } from "react-router-dom";

function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    navigator(`/knowledge/services/keyword/${searchQuery}`);
  };

  const navigator = useNavigate();

  return (
    <PageTemplate>
      <div style={{ backgroundColor: "#fff" }}>
        <div className="container">
          <div class="row justify-content-center p-cus-1">
            <div className="col-md-8 justify-content-center" style={{ textAlign:"center"}}>
              <img src={pageImg} alt="" width="360px" height="240px"/>
            </div>
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
            <div class="col-md-8">
              <div className="inforMessage">
                <p className="inf__title">More than just a search!</p>
                <p className="inf__body">
                  While it serves as a traditional search, you can also use
                  natural launguage queries.
                  <br />
                  Meaning, Taxglobal search can be used to ask questions you may
                  have.
                </p>
                <p>Examples</p>
                <p>
                  <a
                    className="inforLinks"
                    href="/knowledge/services/keyword/How do I know my tax bracket and tax rate?"
                  >
                    How do I know my tax bracket and tax rate?
                  </a>
                </p>

                <p>
                  <a
                    className="inforLinks"
                    href="/knowledge/services/keyword/What tax form should I use?"
                  >
                    What tax form should I use?
                  </a>
                </p>

                <p>
                  {" "}
                  <a
                    className="inforLinks"
                    href="/knowledge/services/keyword/Should I take the standard deduction or itemize?"
                  >
                    Should I take the standard deduction or itemize?
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}

export default KnowledgePage;
