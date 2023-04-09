/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import "./_subscription.scss";

import { Button, Card, Col, Row } from "react-bootstrap";

interface EntitySubscriptionProps {
  children?: JSX.Element | JSX.Element[];
}

const EntitySubscription: FC<EntitySubscriptionProps> = () => {
  return (
    <Card className="subscription">
      <Card.Body>
        <h1>Get the most out of Taxglobal</h1>
        <div className="page-info">
          We have the right plans for any size of company. Whether you're a
          small business or a large enterprise, we have a solution that fits
          your needs. If you are not sure which plan to select,{" "}
          <a href="/contact">contact us</a>. We will help you.
        </div>
        <Row className="package-list g-3">
          <Col md="3" className="package-list-item">
            <Card className="subscription-item">
              <Card.Body>
                <h3>Basic</h3>
                <div className="price">
                  <span className="main-price">Free</span>
                </div>
                <ul className="features">
                  <li>Maintain your presense in Taxglobal</li>
                  <li>Discover potential clients</li>
                </ul>
              </Card.Body>
              <Card.Footer>
                <Button variant="dark" disabled={true}>
                  Select plan
                </Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="3" className="package-list-item">
            <Card className="subscription-item">
              <Card.Body>
                <h3>Small Business</h3>
                <div className="price">
                  <span className="main-price">$249/month</span>
                  <span className="additional-price">
                    + Start at $5 per lead
                  </span>
                </div>
                <ul className="features">
                  <li>Preferred listing on home page by sector/region</li>
                  <li>1 highlighted profile/month</li>
                  <li>1 blog post/month</li>
                  <li>
                    100GB fully secured private cloud storage for customer files
                  </li>
                  <li>30 days of file recovery & version history</li>
                  <li>Bi-weekly tax law update emails</li>
                  <li>eSignatures 5 docs/month</li>
                </ul>
              </Card.Body>
              <Card.Footer>
                <Button variant="dark" disabled={true}>
                  Select plan
                </Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="3" className="package-list-item">
            <Card className="subscription-item">
              <Card.Body>
                <h3>Medium Business</h3>
                <div className="price">
                  <span className="main-price">$499/month</span>
                  <span className="additional-price">
                    + Start at $5 per lead
                  </span>
                </div>
                <ul className="features">
                  <li>Preferred listing on home page by sector/region/US</li>
                  <li>5 highlighted profile/month</li>
                  <li>5 blog post/month</li>
                  <li>
                    500GB fully secured private cloud storage for customer files
                  </li>
                  <li>90 days of file recovery & version history</li>
                  <li>Weekly tax law update emails</li>
                  <li>eSignatures 25 docs/month</li>
                  <li>Free migration support</li>
                  <li>1 support zoom call (60 mins)</li>
                </ul>
              </Card.Body>
              <Card.Footer>
                <Button variant="dark" disabled={true}>
                  Select plan
                </Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="3" className="package-list-item">
            <Card className="subscription-item">
              <Card.Body>
                <h3>Large Business</h3>
                <div className="price">
                  <span className="main-price">$999/month</span>
                  <span className="additional-price">
                    + Start at $5 per lead
                  </span>
                </div>
                <ul className="features">
                  <li>
                    Preferred listing on home page by sector/region/Global
                  </li>
                  <li>10 highlighted profiles/month</li>
                  <li>15 blog posts/month</li>
                  <li>
                    2000GB fully secured private cloud storage for customer
                    files
                  </li>
                  <li>180 days of file recovery & version history</li>
                  <li>Weekly tax law update </li>
                  <li>eSignatures 75 docs/month</li>
                  <li>Free migration support</li>
                  <li>Priority access to off-shore teams during peak season</li>
                  <li>3 support zoom calls (60mins each)</li>
                  <li>Unlimited remote support</li>
                  <li>Dedicated account manager</li>
                </ul>
              </Card.Body>
              <Card.Footer>
                <Button variant="dark" disabled={true}>
                  Select plan
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default EntitySubscription;
