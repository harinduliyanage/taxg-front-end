import { FC } from "react";
import { Button, Card, Container } from "react-bootstrap";

interface Props {
  heading: string;
  subTitle: string;
  crossCheckTitle: string;
  crossCheckUrl: string;
  crossCheckLabel: string;
  //children: JSX.Element[];
}

const LoginJourneyTemplate: FC<Props> = ({
  heading,
  subTitle,
  crossCheckTitle,
  crossCheckUrl,
  crossCheckLabel,
  //children,
}) => {
  return (
    <div className="login-journey py-7">
      <Container>
        <Card className="single-page">
          <Card.Body>
            <div className="title-section">
              <h1>{heading}</h1>
              <p>{subTitle}</p>
            </div>
            {/* {children} */}
            <div className="cross-check">
              <h6 className="small-text">{crossCheckTitle}</h6>
              <Button variant="link" href={crossCheckUrl}>
                {crossCheckLabel}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoginJourneyTemplate;
