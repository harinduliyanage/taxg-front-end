import { FC, useEffect, useState } from "react";
import "./_subscription-details.scss";
import { Badge, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { EntityData } from "../../../interfaces/models/entity/EntityData";
import { ENTITY_KEY } from "../../../actions/keys";
import visaImage from "../../../assets/images/visa.svg";
import masterImage from "../../../assets/images/mastercard.svg";
import axios from "axios";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import EntitySubscription from "./EntitySubscription";
interface Props {
  data?: EntityData;
  entityId?: number;
  setRerender?: any;
  countryList?: any[];
}

type RadioButtons = {
  kindOfStand: string;
  another: string;
};

const EntitySubscriptionDetails: FC<Props> = (props) => {
  const { data, setRerender, countryList } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isCancelPopup, setIsCancelPopup] = useState(false);
  const [enableSubscription, setEnableSubscription] = useState(false);
  const { state } = useLocation();
  const [item, setItem] = useState<RadioButtons>({
    kindOfStand: "",
    another: "another",
  });
  const { kindOfStand } = item;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [selectedCountry, setSelectedCuntry] = useState({
    id: "",
    country_name: "",
  });
  const config = {
    Accept: "application/json",
    "x-api-key": ENTITY_KEY,
  };
  const cancelSubscriptionPlan = () => {
    // alert("cancelSubscriptionPlan");
    setIsCancelPopup(false);
    axios
      .delete(
        `https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/EntitySubscription/${state.entityId}`,
        {
          headers: config,
        }
      )
      .then((res: any) => {
        console.log("cancelSubscriptionPlan", res.data);
        setRerender(false);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const changeSubscriptionPlan = () => {
    setEnableSubscription(true);
  };

  useEffect(() => {
    getSelectedCountry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const getSelectedCountry = () => {
    setSelectedCuntry(
      countryList?.find((e: any) => e.id === data?.billingAddress.countryID)
    );
  };

  const removeCard = (paymentId: any) => {
    console.log("first", paymentId);
    axios
      .delete(
        `https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/EntityPaymentMethod/${paymentId}`,
        {
          headers: config,
        }
      )
      .then((res: any) => {
        console.log("removeCard", res.data);
        setRerender(false);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const updateDefaultCard = async (paymentId: any, value: boolean) => {
    //to do: remove previous card
    /*let previousCardId;
    data?.subscription.paymentMethods.forEach((e) => {
      if( e.defaultPaymentMethod === 1) {
        previousCardId = e.paymentMethodID
      }
      //console.log("arr", e.paymentMethodID, e.defaultPaymentMethod)
    })
    await axios
    .put(
      `https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/EntityPaymentMethods`,
      {
        paymentMethodID: previousCardId,
        defaultPaymentMethod: 0,
      },
      {
        headers: config,
      }
    )
    .then((res: any) => {
      console.log("1updateDefaultCard", res.data);
      //setRerender(false);
    })
    .catch((error: any) => {
      console.log(error);
    });*/
    await axios
      .put(
        `https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/EntityPaymentMethods`,
        {
          paymentMethodID: paymentId,
          defaultPaymentMethod: value ? 1 : 0,
        },
        {
          headers: config,
        }
      )
      .then((res: any) => {
        console.log("2updateDefaultCard", res.data);
        setRerender(false);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addNewCard = () => {
    console.log("addNewCard");
    setIsOpen(false);

    const dataSet = {
      subscriptionID: data?.subscription.subscriptionID,
      gatewayReference: "1233ER",
      cardType: 1,
      cardStatus: 1,
      cardLastFourDigits: 1456,
      cardExpireDate: "11.11.2022",
      defaultPaymentMethod: 1,
    };
    axios
      .post(
        "https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/EntityPaymentMethods",
        dataSet,
        {
          headers: config,
        }
      )
      .then((res: any) => {
        console.log("addNewCard", res.data);
        setRerender(false);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleChange = (e: any) => {
    e.persist();
    console.log(e.target.value);

    setItem((prevState) => ({
      ...prevState,
      kindOfStand: e.target.value,
    }));
  };

  return (
    <>
      {enableSubscription ? (
        <EntitySubscription />
      ) : (
        <div className="subscription-details">
          <h1>Your plan</h1>

          {data?.subscription.subscriptionPlanID === 0 ? (
            <div className="panel-items">
              <h3>Basic plan</h3>
              <div className="price">
                <span className="amount">Free</span>
                <span className="panel-action">
                  <Button
                    variant="outline-light"
                    onClick={() => changeSubscriptionPlan()}
                  >
                    Upgrade
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => setIsCancelPopup(true)}
                  >
                    Cancel plan
                  </Button>
                </span>
              </div>
            </div>
          ) : data?.subscription.subscriptionPlanID === 1 ? (
            <div className="panel-items">
              <h3>Small Business Membership</h3>
              <div className="price">
                <span className="amount">$199/month</span>
                <span className="panel-action">
                  <Button
                    variant="outline-light"
                    onClick={() => changeSubscriptionPlan()}
                  >
                    Upgrade
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => setIsCancelPopup(true)}
                  >
                    Cancel plan
                  </Button>
                </span>
              </div>
              <div className="extra-info">
                <ul>
                  <li>Billing monthly</li>
                  <li>
                    <i className="fas fa-circle"></i>
                  </li>
                  <li>Next payment on December 29 for $199.00</li>
                </ul>
              </div>
            </div>
          ) : data?.subscription.subscriptionPlanID === 2 ? (
            <div className="panel-items">
              <h3>Medium Business Membership</h3>
              <div className="price">
                <span className="amount">$499/month</span>
                <span className="panel-action">
                  <Button
                    variant="outline-light"
                    onClick={() => changeSubscriptionPlan()}
                  >
                    Upgrade
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => setIsCancelPopup(true)}
                  >
                    Cancel plan
                  </Button>
                </span>
              </div>
              <div className="extra-info">
                <ul>
                  <li>Billing monthly</li>
                  <li>
                    <i className="fas fa-circle"></i>
                  </li>
                  <li>Next payment on December 29 for $499.00</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="panel-items">
              <h3>Enterprise Membership</h3>
              <div className="price">
                <span className="amount">$999/month</span>
                <span className="panel-action">
                  <Button
                    variant="outline-light"
                    onClick={() => changeSubscriptionPlan()}
                  >
                    Upgrade
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => setIsCancelPopup(true)}
                  >
                    Cancel plan
                  </Button>
                </span>
              </div>
              <div className="extra-info">
                <ul>
                  <li>Billing monthly</li>
                  <li>
                    <i className="fas fa-circle"></i>
                  </li>
                  <li>Next payment on December 29 for $999.00</li>
                </ul>
              </div>
            </div>
          )}

          <div className="panel-items">
            <h4>Monthly payment limit</h4>
            <div className="price">
              <span className="amount">$2,000</span>
              <span className="panel-action">
                <Button variant="outline-light">Edit</Button>
              </span>
            </div>
          </div>

          <section className="payment-method py-3">
            <h3>Payment methods</h3>

            {data?.subscription.paymentMethods ? (
              data?.subscription.paymentMethods.map((e: any, key: any) => (
                <div className="panel-items" key={key}>
                  <div className="card-info">
                    <span className="credit-card">
                      <span className="card-icon">
                        {e.cardType === 0 ? (
                          <img src={visaImage} alt="Card type" />
                        ) : (
                          <img src={masterImage} alt="Card type" />
                        )}
                      </span>
                      <span className="card-details">
                        <span className="card-number">
                          **** **** **** {e.cardLastFourDigits}{" "}
                          <Badge pill bg="lightest" text="dark">
                            {e.cardStatus === 0
                              ? "Paid"
                              : e.cardStatus === 1
                              ? "Expired"
                              : "Pending"}
                          </Badge>
                        </span>
                        <span className="card-expire">
                          Expires{" "}
                          {monthNames[new Date(e.cardExpireDate).getUTCMonth()]}{" "}
                          {new Date(e.cardExpireDate).getFullYear()}
                        </span>
                      </span>
                    </span>

                    <span className="panel-action">
                      <Form.Group>
                        <Form.Check
                          type="checkbox"
                          id="makeDefault"
                          label="Default payment method"
                          onChange={(val) =>
                            updateDefaultCard(
                              e.paymentMethodID,
                              val.target.checked
                            )
                          }
                          defaultChecked={e.defaultPaymentMethod}
                          value={1}
                        />
                      </Form.Group>
                      <Button
                        variant="outline-danger"
                        onClick={() => removeCard(e.paymentMethodID)}
                      >
                        Remove
                      </Button>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="panel-items">No card</div>
            )}

            <Button className="add-new" onClick={() => setIsOpen(true)}>
              <i className="fal fa-plus" /> Add new card
            </Button>
          </section>

          <section className="billing-address py-3">
            <h3>Billing address</h3>
            <div className="billing-form">
              <Form.Group
                className="form-group"
                controlId="entityValues.entityName"
              >
                <Form.Label>Name on invoice</Form.Label>
                <Form.Control
                  // className={errors.entityName && "is-invalid"}
                  defaultValue={data?.billingAddress.nameOnInvoice}
                ></Form.Control>
                {/* {errors.entityName && "First name is required"} */}
              </Form.Group>
              <Form.Group
                className="form-group"
                controlId="entityValues.entityName"
              >
                <Form.Label>Street address</Form.Label>
                <Form.Control
                  defaultValue={data?.billingAddress.streetAddress}
                ></Form.Control>
                {/* {errors.entityName && "First name is required"} */}
              </Form.Group>

              <Row className="g-3">
                <Col md="4">
                  <Form.Group
                    className="form-group"
                    controlId="entityValues.entityName"
                  >
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      defaultValue={data?.billingAddress.city}
                    ></Form.Control>
                    {/* {errors.entityName && "First name is required"} */}
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group
                    className="form-group"
                    controlId="entityValues.entityName"
                  >
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      defaultValue={data?.billingAddress.state}
                    ></Form.Control>
                    {/* {errors.entityName && "First name is required"} */}
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group
                    className="form-group"
                    controlId="entityValues.entityName"
                  >
                    <Form.Label>ZIP code</Form.Label>
                    <Form.Control
                      defaultValue={data?.billingAddress.zipCode}
                    ></Form.Control>
                    {/* {errors.entityName && "First name is required"} */}
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="form-group">
                <Form.Label>Country</Form.Label>
                <Select
                  value={{
                    value: selectedCountry.id,
                    label: selectedCountry.country_name,
                  }}
                  //onChange={setSelectedOption}
                  options={
                    countryList &&
                    countryList.map((e: any) => ({
                      value: e.id,
                      label: e.id + "-" + e.country_name,
                    }))
                  }
                />
              </Form.Group>
            </div>
          </section>

          <section className="billing pt-3">
            <h3>Billing history</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Description</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                  <th scope="col">Invoice</th>
                </tr>
                {data?.billingHistory
                  ? data?.billingHistory.map((e, key) => (
                      <tr key={key}>
                        <td>{e.paymentDate}</td>
                        <td>{e.paymentDescription}</td>
                        <td>{e.paymentStatus === 1 ? "Paid" : "Pending"}</td>
                        <td>${e.paymentAmount}</td>
                        <td>
                          <a href={e.invoiceLocation} download>
                            Download
                          </a>
                        </td>
                      </tr>
                    ))
                  : "No Bills"}
              </thead>
            </table>
          </section>

          <Modal
            show={isOpen}
            //onHide={isOpen}
            backdrop="static"
            keyboard={false}
            centered={true}
          >
            <Modal.Body>
              <div className="form-layout">
                <h3>Add new card</h3>
                <Row>
                  <Col md={"7"}>
                    <Form.Group controlId="kindOfStand">
                      <Form.Check
                        value="Master"
                        type="radio"
                        aria-label="radio 1"
                        label="Master"
                        onChange={handleChange}
                        checked={kindOfStand === "Master"}
                      />
                      <Form.Check
                        value="Visa"
                        type="radio"
                        aria-label="radio 2"
                        label="Visa"
                        onChange={handleChange}
                        checked={kindOfStand === "Visa"}
                      />
                    </Form.Group>
                    <Form.Group
                      className="form-group"
                      controlId="entityValues.entityName"
                    >
                      <Form.Control placeholder="Name on card"></Form.Control>
                    </Form.Group>
                    <Form.Group
                      className="form-group"
                      controlId="entityValues.entityName"
                    >
                      <Form.Control placeholder="Card Number"></Form.Control>
                    </Form.Group>
                    <Form.Group
                      className="form-group"
                      controlId="entityValues.entityName"
                    >
                      <Form.Control placeholder="Expiration"></Form.Control>
                    </Form.Group>
                    <Form.Group
                      className="form-group"
                      controlId="entityValues.entityName"
                    >
                      <Form.Control placeholder="CVV"></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark error" onClick={() => addNewCard()}>
                Add Card
              </Button>
              <Button variant="outline-light" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={isCancelPopup}
            //onHide={isOpen}
            backdrop="static"
            keyboard={false}
            centered={true}
          >
            <Modal.Body>
              <div className="form-layout">
                <h3>Cancelling your subscription</h3>
                <Row>
                  <Col>
                    <p>
                      You are about to cancel your subscription. By cancelling
                      you will be downgraded to the Basic Plan at the end of the
                      billing cycle and you will lose features of your current
                      plan. Press cancel to go back.
                    </p>
                  </Col>
                </Row>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="dark error"
                onClick={() => cancelSubscriptionPlan()}
              >
                Cancel subscription
              </Button>
              <Button
                variant="outline-light"
                onClick={() => setIsCancelPopup(false)}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
};
export default EntitySubscriptionDetails;
