import ContentPageTemplate from "../templates/ContentPageTemplate";
import errorImg from "../../assets/images/errorImg.svg";
import { Button } from "react-bootstrap";
import "./_styles.scss";
import { useNavigate } from "react-router-dom";

const LinkExpiredPage = () => {
  const navigator = useNavigate();

  return (
    <ContentPageTemplate className="not-found">
      <img src={errorImg} alt="" />
      <h1>Oh no!</h1>
      <strong>The Link You Clicked is expired.</strong>

      <div className="page-action">
        <Button variant="dark" onClick={() => navigator("/")}>
          Back to Home
        </Button>
        <Button variant="outline-light" onClick={() => navigator("/contact")}>
          Contact us
        </Button>
      </div>
    </ContentPageTemplate>
  );
};

export default LinkExpiredPage;
