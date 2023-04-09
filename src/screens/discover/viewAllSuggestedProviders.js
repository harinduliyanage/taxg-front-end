import { useState, useEffect } from "react";
import "./_DiscoverPage.scss";
import PageTemplate from "../templates/PageTemplate";
import { Row, Col, Container, Pagination } from "react-bootstrap";
import axios from "axios";
import { Auth } from "aws-amplify";
import dicoverImage from "../../assets/images/people-graphic.svg";
import ViewAllProfileCards from "../../components/organisms/profiles/viewAllProfileCards";
// import { useNavigate } from "react-router-dom";

function ViewAllSuggestedProviders() {
  // const navigator = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [matchingServiceProviders, setMatchingServiceProviders] =
    useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [pageVal, setPageVal] = useState(1);
  // const loadMoreRef = useRef(null);
  // const [hasMoreData, setHasMoreData] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting && !isLoading && hasMoreData) {
  //       setPageVal(pageVal + 1);
  //       setIsLoading(true);
  //     }
  //   });
  //   observer.observe(loadMoreRef.current);
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [isLoading, pageVal, hasMoreData]);

  useEffect(() => {
    searchDiscovers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function searchDiscovers() {
    const { attributes } = await Auth.currentAuthenticatedUser();
    setIsLoading(true);
    await axios
      .get(
        `https://22qzdzicjh.execute-api.us-east-1.amazonaws.com/dev/ServiceProvideMachingPaginate/${attributes.sub}?page=${page}`
      )
      .then(async (res) => {
        setMatchingServiceProviders(
          res.data.results.recommendations !== undefined &&
            Object.keys(res.data.results.recommendations).length === 0
            ? null
            : res.data.results.recommendations
        );
        
        console.log("data :", res.data);
        setPageCount(Math.ceil(res.data.results.dataLength / 10));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleNextPage = () => {
    setPage(page + 1);
    searchDiscovers();
  };

  const handlePrevPage = () => {
    setPage(page - 1);
    searchDiscovers();
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    searchDiscovers();
  };

  return (
    <PageTemplate>
      <div className="discover-viewall">
        <section className="discovery-page-banner">
          <Container>
            <Row className="align-items-center">
              <Col className="banner-content justify-content-center">
                <img
                  className="banner-image mr-3"
                  src={dicoverImage}
                  alt="Find perfect match"
                />
                <span className="content">
                  <h3 className="display-4">
                    Find the perfect match for your requirements
                  </h3>
                </span>
              </Col>
            </Row>
          </Container>
        </section>

        <Container>
          <section className="gray-bg pt-4 profile-list">
            <div className="cards-display">
              {!isLoading ? <ViewAllProfileCards
                matchingServiceProviders={matchingServiceProviders}
              /> : <p>Loading</p>}
              
            </div>
          </section>

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
        </Container>
      </div>
    </PageTemplate>
  );
}

export default ViewAllSuggestedProviders;
