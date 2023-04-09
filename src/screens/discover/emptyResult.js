import PageTemplate from "../templates/PageTemplate";
import { Button } from "react-bootstrap";
import pageImg from "../../assets/images/noMatches.svg";
import "./_empty.scss";
import { useNavigate } from "react-router-dom";

function EmptyResult() {
  const navigator = useNavigate();

  return (
    <PageTemplate>
      <div className="container">
        <div className="empty-result text-center">
          <img src={pageImg} alt="" />
          <h1>Sorry!</h1>
          <h6>We could not find any matches for your query</h6>
          <p>Try entering different keywords or let us know!</p>

          <div className="page-bottom d-flex justify-content-center">
            <Button
              variant="dark"
              onClick={() => {
                navigator("/discover");
              }}
            >
              Back to Home
            </Button>
            <Button
              variant="outline-light"
              onClick={() => {
                navigator("/contact");
              }}
            >
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}

export default EmptyResult;
