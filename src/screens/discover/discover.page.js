import axios from "axios";
import { useEffect, useState } from "react";
import CateggeriesSeach from "../../components/organisms/categories_search";
// import {
//   HeadingH2,
//   HeadingH3,
//   Paragraph,
// } from "../../components/organisms/headings";
import ProfileCards from "../../components/organisms/profiles";
import "./_DiscoverPage.scss";
import "./_discover-v2.scss";
// import { DISCOVER_SEARCH_KEY } from "../../actions/keys";
import { Col, Row, Container, Button, Pagination } from "react-bootstrap";
import Jumbotron from "../../components/organisms/jumbotron";
import { useNavigate, useParams } from "react-router-dom";
import PageTemplate from "../templates/PageTemplate";
import KnowledgeImage from "../../assets/images/knowledge-graphic.svg";
import EmptyResult from "../../components/organisms/discover/emptyResult";

function DiscoverPageTwo() {
  const [matchingServiceProviders, setMatchingServiceProviders] =
    useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState(id);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  // const [data, setData] = useState(null);
  const navigator = useNavigate();
  useEffect(() => {
    searchDiscovers(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page]);

  const handleNextPage = () => {
    setPage(page + 1);
    searchDiscovers(id);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
    searchDiscovers(id);
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    searchDiscovers(id);
  };

  async function searchDiscovers(id) {
    setIsLoading(true);
    await axios
      .get(
        `https://eeizq5dpte.execute-api.us-east-1.amazonaws.com/dev/ServiceProviderSearch/${id}?page=${page}`
      )
      .then(async (res) => {
        setMatchingServiceProviders(
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
  const navigateKnowledgeSearch = (searchVal) => {
    navigator(`/knowledge/services/keyword/${searchVal}`);
  };
  return (
    <>
      {matchingServiceProviders === null && !isLoading ? (
        <>
          <EmptyResult></EmptyResult>
        </>
      ) : (
        <PageTemplate>
          <main className="discovery-knowlege-search">
            <section className="search-area bg-white">
              <Container>
                <Row>
                  <Col md="12">
                    <CateggeriesSeach
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      searchDiscovers={searchDiscovers}
                    />
                  </Col>
                </Row>
              </Container>
            </section>

            <section className="page-banner">
              <Container>
                <Row className="align-items-center">
                  <Col className="banner-content">
                    <img className="banner-image" src={KnowledgeImage} alt="" />
                    <span className="content">
                      <h6>Knowledge based results</h6>
                      <p>
                        Our knowledge engine powered by NLP (natural language
                        processing) can help you with tax forms and laws
                        questions.{" "}
                      </p>
                    </span>
                  </Col>
                  <Col
                    md="3"
                    className="d-flex justify-content-end banner-sidebar"
                  >
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={() => navigateKnowledgeSearch(searchQuery)}
                    >
                      <i className="fal fa-external-link-alt"></i>
                      Go there
                    </Button>
                  </Col>
                </Row>
              </Container>
            </section>

            <div className="container py-4">
              <section className="gray-bg profile-list">
                <div className="cards-display">
                  {!isLoading ? (
                    <ProfileCards
                      matchingServiceProviders={matchingServiceProviders}
                      isLoading={isLoading}
                    />
                  ) : (
                    <>Loading</>
                  )}
                </div>
              </section>

              <div className="row">
                <div className="col-12">
                  <Jumbotron />
                </div>
              </div>

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
          </main>
        </PageTemplate>
      )}
    </>
  );
}

export default DiscoverPageTwo;
