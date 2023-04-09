import "./_learning-page.scss";
import LearnImage from "../../assets/images/learn-graphic.svg";
import { Button } from "react-bootstrap";
import PageTemplate from "../templates/PageTemplate";
const LearningPage = () => {
  return (
    <PageTemplate>
      <div className="learning-page">
        <div className="container">
          <div className="roll-selection pt-6">
            <div className="image-wrapper">
              <img
                className="img-fluid"
                src={LearnImage}
                alt="Role Selection images"
              />
            </div>

            <div className="title-section">
              <h1 className="mb-2">Your one-stop shop for CPA learning</h1>
              <h3 className="mb-0">
                Browse our extensive database of CPA courses, then choose the
                ones you’d like to take and get started.
              </h3>
            </div>

            <Button variant="outline-light">
              <i className="fas fa-envelope" />
              Keep me posted
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default LearningPage;
