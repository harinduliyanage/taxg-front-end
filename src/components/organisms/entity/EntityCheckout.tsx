import { FC } from "react";
import "./_subscription-checkout.scss";
import { Card, Button, Col, Form, Alert, Row } from "react-bootstrap";
// import { EntityData } from "../../../interfaces/models/entity/EntityData";
// import { ENTITY_KEY } from "../../../actions/keys";
// import visaImage from "../../../assets/images/visa.svg";
// import masterImage from "../../../assets/images/mastercard.svg";
// import axios from "axios";
import Select from "react-select";

interface Props {}

const EntityCheckout: FC<Props> = (props) => {
  return (
    <>
      <Card className="mb-4">
        <Card.Body>
          <div className="entity-checkout">
            <Row>
              <Col md="7">
                <h1>Subscription</h1>
                <div className="panel-items">
                  <div className="price">
                    <span className="amount">
                      <h4>Medium Business Membership</h4>
                      <strong>$5,988/year</strong>
                    </span>
                    <span className="panel-action">
                      <Button size="sm" variant="outline-light">
                        Change plan
                      </Button>
                    </span>
                  </div>
                </div>

                <Row>
                  <Col>
                    <div className="panel-items flex-row">
                      <Form.Check
                        inline
                        type="radio"
                        id="payAnnually"
                        label="Billed annually"
                        name="billFrequent"
                      />
                      <span className="promo-info">Save 20%</span>
                    </div>
                  </Col>
                  <Col>
                    <div className="panel-items flex-row">
                      <Form.Check
                        inline
                        type="radio"
                        id="paymonthly"
                        label="Billed monthly"
                        name="billFrequent"
                      />
                    </div>
                  </Col>
                </Row>

                <div className="panel-items">
                  <div className="price">
                    <span className="amount">
                      <h4>Monthly lead limit</h4>
                      <strong>$2,000</strong>
                    </span>
                    <span className="panel-action">
                      <Button size="sm" variant="outline-light">
                        Edit
                      </Button>
                    </span>
                  </div>
                </div>

                <Alert variant="info-light" className="mb-0 mt-0">
                  <i className="fas fa-info-circle"></i> Monthly lead limit is
                  the maximum value you are willing to spend monthly for
                  generating leads. This can be changed at anytime.
                </Alert>

                <section className="billing-address mt-4">
                  <h3>Billing address</h3>
                  <Form.Group>
                    <Form.Label>Name on invoice</Form.Label>
                    <Form.Control></Form.Control>
                  </Form.Group>
                  <Form.Group
                    className="form-group"
                    controlId="entityValues.entityName"
                  >
                    <Form.Label>Street address</Form.Label>
                    <Form.Control
                    // defaultValue={}
                    ></Form.Control>
                    {/* {errors.entityName && "First name is required"} */}
                  </Form.Group>

                  <Row className="g-3">
                    <Col md="6">
                      <Form.Group
                        className="form-group"
                        controlId="entityValues.entityName"
                      >
                        <Form.Label>City</Form.Label>
                        <Form.Control
                        // defaultValue={}
                        ></Form.Control>
                        {/* {errors.entityName && "First name is required"} */}
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group
                        className="form-group"
                        controlId="entityValues.entityName"
                      >
                        <Form.Label>State</Form.Label>
                        <Form.Control
                        // defaultValue={}
                        ></Form.Control>
                        {/* {errors.entityName && "First name is required"} */}
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group
                        className="form-group"
                        controlId="entityValues.entityName"
                      >
                        <Form.Label>ZIP code</Form.Label>
                        <Form.Control
                        // defaultValue={}
                        ></Form.Control>
                        {/* {errors.entityName && "First name is required"} */}
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group className="form-group">
                        <Form.Label>Country</Form.Label>
                        <Select
                        // value={}
                        // options={  }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </section>
              </Col>
              <Col md="5" className="d-flex">
                <Card className="card-details">
                  <Card.Body>
                    <h3>Payment details</h3>

                    <div className="card-form-fields">
                      <Form.Group>
                        <Form.Label>Name on card</Form.Label>
                        <Form.Control></Form.Control>
                      </Form.Group>
                      <Form.Group
                        className="form-group"
                        controlId="entityValues.entityName"
                      >
                        <Form.Label>Card number</Form.Label>
                        <Form.Control
                        // defaultValue={}
                        ></Form.Control>
                        {/* {errors.entityName && "First name is required"} */}
                      </Form.Group>

                      <Row className="g-3 mb-4">
                        <Col md="6">
                          <Form.Group
                            className="form-group"
                            controlId="entityValues.entityName"
                          >
                            <Form.Label>Expiration date</Form.Label>
                            <Form.Control
                            // defaultValue={}
                            ></Form.Control>
                            {/* {errors.entityName && "First name is required"} */}
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group
                            className="form-group"
                            controlId="entityValues.entityName"
                          >
                            <Form.Label>CVC</Form.Label>
                            <Form.Control
                            // defaultValue={}
                            ></Form.Control>
                            {/* {errors.entityName && "First name is required"} */}
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>

                    <h3>Discount code</h3>
                    <Row className="g-3 mb-4">
                      <Col>
                        <Form.Group
                          className="form-group"
                          controlId="discountCode"
                        >
                          <Form.Control
                          // defaultValue={}
                          ></Form.Control>
                          {/* {errors.entityName && "First name is required"} */}
                        </Form.Group>
                      </Col>
                      <Col md="3">
                        <Button variant="outline-light" size="sm">
                          Apply
                        </Button>
                      </Col>
                    </Row>
                    <h3>Summery</h3>
                    <Row className="billing-item">
                      <Col md="auto" className="billing-item-name">
                        Medium Business Membership
                      </Col>
                      <Col className="billing-item-value text-right">
                        $5,988
                      </Col>
                    </Row>
                    <Row className="billing-item">
                      <Col className="billing-item-name">TAX (15%)</Col>
                      <Col md="auto" className="billing-item-value text-right">
                        $898.2
                      </Col>
                    </Row>
                    <Row className="billing-item last-row">
                      <Col className="billing-item-name">Total</Col>
                      <Col md="auto" className="billing-item-value text-right">
                        $6,886.2 / year
                      </Col>
                    </Row>
                    <div className="card-actions">
                      <Button variant="dark" className="d-block">
                        Pay now
                      </Button>
                      <Button variant="outline-danger">Cancel order</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
export default EntityCheckout;
