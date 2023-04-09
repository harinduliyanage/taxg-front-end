import axios from "axios";
import { useEffect, useState } from "react";
// import CateggeriesSeach from "../../components/organisms/categories_search";
import {
  HeadingH2,
  HeadingH3,
  Paragraph,
} from "../../components/organisms/headings";
// import "./_DiscoverPage.scss";
// import "./_discover-v2.scss";
import "./knowledgeresults.scss";
import "./knowledgeresultsadd.scss";
import { DISCOVER_SEARCH_KEY } from "../../actions/keys";
import { Col, Row, Card, Container } from "react-bootstrap";

import { useParams } from "react-router-dom";
import PageTemplate from "../templates/PageTemplate";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

function KnowledgeResults() {
  const [moreAnswers, setMoreAnswers] = useState(null);
  const [suggestedAnswers, setSuggestedAnswers] = useState(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //const [matchingServiceProviders, setMatchingServiceProviders] =
  useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState(id);

  useEffect(() => {
    searchDiscovers(id);
  }, [id]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    navigator(`/knowledge/services/keyword/${searchQuery}`);
  };

  const navigator = useNavigate();

  async function searchDiscovers(searchQuery) {
    const config = {
      "x-api-key": DISCOVER_SEARCH_KEY,
    };
    setIsLoading(true);
    setTimeout(async () => {
      await axios
        .get(
          `https://f5bf8zclzi.execute-api.us-east-1.amazonaws.com/dev/discover?searchKeyword="${searchQuery}"`,
          {
            headers: config,
          }
        )
        .then(async (res) => {
          setMoreAnswers(
            res.data.results.more_answers !== undefined &&
              Object.keys(res.data.results.more_answers).length === 0
              ? null
              : res.data.results.more_answers
          );

          setSuggestedAnswers(
            res.data.results.suggested_answer !== undefined &&
              Object.keys(res.data.results.suggested_answer).length === 0
              ? null
              : res.data.results.suggested_answer
          );
          setIsLoading(false);
          console.log("response data :", res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 5000);
  }

  const SuggestedAnswers = (data) => {
    return (
      <div className="suggested__Answers">
        <HeadingH3
          text={suggestedAnswers.answerTitle}
          className="heading__cus2"
        />
        <Paragraph text={suggestedAnswers.answerDetail} />
        <div className="like__answer">
          {suggestedAnswers.answerURL !== "" && (
            <p style={{ marginBottom: 0 }}>
              {suggestedAnswers.answerURL && <>Source Link :</>}
              <a
                className="More__link"
                href={suggestedAnswers.answerURL}
                target="_blank"
                rel="noreferrer"
              >
                {suggestedAnswers.answerURL}
              </a>
            </p>
          )}
        </div>
      </div>
    );
  };

  const MoreAnswers = (data) => {
    return (
      <div className="moreAnswers">
        <HeadingH3 text={data.data.answerTitle} className="heading__cus2" />
        <Paragraph text={data.data.answerDetail} />
        <div className="like__answer">
          {data.data.answerURL !== "" && (
            <p style={{ marginBottom: 0 }}>
              {data.data.answerURL && <>Source Link :</>}
              <a
                className="More__link"
                href={data.data.answerURL}
                target="_blank"
                rel="noreferrer"
              >
                {data.data.answerURL}
              </a>
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <PageTemplate>
      <main className="discovery-knowlege-search">
        <section className="search-area bg-white">
          <Container>
            <Row>
              <Col md="12">
                {/* <CateggeriesSeach
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  searchDiscovers={searchDiscovers}
                /> */}
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
              </Col>
            </Row>
          </Container>
        </section>

        <div className="container py-4">
          <Row className="top-buffer">
            <Col md={12}>
              <Card className="discover-suggestions">
                <Card.Body>
                  <HeadingH2
                    text={"Suggested answer"}
                    className="heading__cus_disc"
                  />
                  {isLoading ? (
                    "Loading"
                  ) : suggestedAnswers ? (
                    <SuggestedAnswers />
                  ) : (
                    "No Records"
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* <section className="gray-bg py-5 profile-list">
            <div className="cards-display">
              <ProfileCards
                matchingServiceProviders={matchingServiceProviders}
              />
            </div>
          </section> */}

          <Row className="top-buffer">
            <Col md={12}>
              <Card className="discover-suggestions">
                <Card.Body>
                  <HeadingH3
                    text={"More answers"}
                    className="heading__cus_disc"
                  />
                  {isLoading
                    ? "Loading"
                    : moreAnswers
                    ? moreAnswers?.map((val, el) => (
                        <MoreAnswers data={val} key={el} />
                      ))
                    : "No Records"}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* <div className="row">
            <div className="col-12">
              <Jumbotron />
            </div>
          </div> */}

          <div className="row">
            <div className="col-12 d-flex justify-content-end">
              {/* Render data here */}
              {/* <Pagination>
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{17}</Pagination.Item>
                <Pagination.Item>{18}</Pagination.Item>
                <Pagination.Next />
              </Pagination> */}
            </div>
          </div>
        </div>
      </main>
    </PageTemplate>
  );
}

export default KnowledgeResults;
