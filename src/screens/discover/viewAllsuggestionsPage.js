import { useState, useEffect } from "react";
import "./_DiscoverPage.scss";
import PageTemplate from "../templates/PageTemplate";
import { Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
import { Auth } from "aws-amplify";
import dicoverImage from "../../assets/images/personalised.svg";
import ViewAllProfileCards from "../../components/organisms/profiles/viewAllProfileCards";
import { useNavigate } from "react-router-dom";

function ViewAllSuggestionsPage() {
  const navigator = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [matchingServiceProviders, setMatchingServiceProviders] =
    useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageVal, setPageVal] = useState(1);
  // const loadMoreRef = useRef(null);
  const [hasMoreData, setHasMoreData] = useState(true);

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
  }, [pageVal]);

  async function searchDiscovers() {
    const { attributes } = await Auth.currentAuthenticatedUser();
    setIsLoading(true);
    await axios
      .get(
        `https://22qzdzicjh.execute-api.us-east-1.amazonaws.com/dev/ServiceProviders/${attributes.sub}?page=${pageVal}`
      )
      .then(async (res) => {
        setMatchingServiceProviders(
          res.data.results.recommendations !== undefined &&
            Object.keys(res.data.results.recommendations).length === 0
            ? null
            : res.data.results.recommendations
        );
         setIsLoading(false);

        if (
          res.data.results.dataLength ===
          res.data.results.recommendations.length
        ) {
          setHasMoreData(false);
          // setIsLoading(false);
        }
        console.log("response data 1 :", res.data.results);
        console.log(
          "changing data length :",
          res.data.results.recommendations.length
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <PageTemplate>
      <div className="discover-viewall">
        <section className="discovery-page-banner">
          <Container>
            <Row className="align-items-center">
              <Col className="banner-content">
                <img
                  className="banner-image lg"
                  src={dicoverImage}
                  alt="Find perfect match"
                />
                <span className="content">
                  <h1>Personalized for you!</h1>
                  <p className="text-info">
                    Discover the best matches with personalised recommendations
                    just for you!{" "}
                  </p>
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
            <div className="col-12">
              <div class="jumbotron-message jumbotron-fluid mb-5">
                <h1 class="display-4">Didn’t find what you are looking for?</h1>
                <p class="lead">
                  We have carefully picked the recommendations which are
                  personalised for you. If none of the recommendations shown
                  fits your need, click Show More to generate more
                  recommendations. Alternatively, you can use our search.
                </p>
                <div className="button__panel">
                  {hasMoreData && (
                    <Button
                      variant="dark"
                      className="mr-4"
                      onClick={() => {
                        setPageVal(pageVal + 1);
                      }}
                    >
                      Show more
                    </Button>
                  )}

                  <Button
                    variant="link"
                    onClick={() => {
                      navigator("/discover");
                    }}
                  >
                    Go to search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </PageTemplate>
  );
}

export default ViewAllSuggestionsPage;
