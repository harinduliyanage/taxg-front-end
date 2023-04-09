import React, { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Tab,
  Nav,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import { List, arrayMove } from "react-movable";
import "./_entity-edit.scss";
import PageTemplate from "../templates/PageTemplate";
import EntityCover from "../../components/organisms/entity/EntityCover";
import EntityCheckout from "../../components/organisms/entity/EntityCheckout";

import SearchUsers from "../../components/organisms/entity/SearchUsers";
import EntityServiceItem from "../../components/organisms/entity/EntityServiceItem";
import EntitySubscription from "../../components/organisms/entity/EntitySubscription";
const EditEntity = () => {
  const [team, setTeam] = React.useState([
    "Marina Cooper",
    "Jerrod Halbert",
    "Alfonso Stanton",
    "Savannah Robertson",
    "Teddy Gibbs",
  ]);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [items, setItems] = React.useState(["Item 1", "Item 2", "Item 3"]);
  const [showAddnewServiceModal, setShowAddnewServiceModal] = useState(false);
  const handleAddNewService = () => setShowAddnewServiceModal(true);
  const handleClose = () => {
    setShowAddnewServiceModal(false);
  };
  return (
    <PageTemplate>
      <section className="edit-entity">
        <Container className="pt-4">
          <Tab.Container id="entityEdit" defaultActiveKey="preview">
            <Card className="full-page">
              <Card.Header>
                <span className="entity-logo">
                  <img src="" alt="" />
                </span>
                KP CAPITAL
                <Button variant="outline-light" disabled>
                  <i className="fas fa-address-card"></i> Customer portal
                </Button>
              </Card.Header>
              <Card.Body>
                <Nav variant="pills" className="tab-navigation">
                  <Nav.Item>
                    <Nav.Link eventKey="preview">Preview</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="details">Entity details</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="team">Team</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="services">Services</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="subscription">Subscription</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="checkout">Checkout</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
            <Tab.Content>
              <Tab.Pane eventKey="preview">
                <Card className="preview-cover">
                  <Card.Body className="p-0">
                    <EntityCover />
                  </Card.Body>
                </Card>
                <Container className="tab-view-container-entity">
                  <Row>
                    <Col md="8" className="offset-md-2">
                      {/* <EntityDetails /> */}
                    </Col>
                  </Row>
                </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="details">
                <Card>
                  <Card.Body>
                    {/* <EditDetails /> */}
                    Entity details
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="team">
                <Card>
                  <Card.Body>
                    <div className="team-tab">
                      <div className="section-header">
                        <Button className="add-new" onClick={handleShow}>
                          <i className="fal fa-plus" /> Add new team member
                        </Button>

                        {/*Add new member modal*/}
                        <Modal
                          className="add-team-member"
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Body>
                            <h3>Add new team member</h3>
                            <div className="search-form">
                              <form action="">
                                <Form.Group>
                                  <SearchUsers />
                                </Form.Group>
                              </form>
                            </div>
                            <Alert variant="light">
                              <strong>Invite your team member.</strong>
                              <p>
                                If you cannot find the person you are looking
                                for, invite them to join Taxglobal.
                              </p>
                              <Button variant="outline-light" size="sm">
                                Invite
                              </Button>
                            </Alert>

                            <div className="invite-members">
                              <Row className="g-2">
                                <Col md={6}>
                                  <Form.Label>Email address</Form.Label>
                                </Col>
                                <Col md={6}>
                                  <Form.Label>Name (Optional)</Form.Label>
                                </Col>
                              </Row>
                              <Row className="g-2">
                                <Col md={6}>
                                  <Form.Control placeholder="john@doe.com" />
                                </Col>
                                <Col md={6}>
                                  <Form.Control placeholder="John Doe" />
                                </Col>
                              </Row>
                              <Row className="g-2">
                                <Col md={6}>
                                  <Form.Control placeholder="john@doe.com" />
                                </Col>
                                <Col md={6}>
                                  <Form.Control placeholder="John Doe" />
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Button variant="outline-light" size="sm">
                                    <i className="fal fa-plus" /> Add another
                                  </Button>
                                </Col>
                              </Row>
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="dark">Add</Button>
                            <Button
                              variant="outline-light"
                              onClick={handleClose}
                            >
                              Cancel
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                      <List
                        values={team}
                        onChange={({ oldIndex, newIndex }) =>
                          setTeam(arrayMove(team, oldIndex, newIndex))
                        }
                        renderList={({ children, props }) => (
                          <div className="team-wrapper" {...props}>
                            {children}
                          </div>
                        )}
                        renderItem={({ value, props }) => <div>{value}</div>}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="services">
                <Card>
                  <Card.Body>
                    <div className="services-tab">
                      <div className="section-header">
                        <Button
                          className="add-new"
                          onClick={handleAddNewService}
                        >
                          <i className="fal fa-plus" /> Add new team member
                        </Button>
                      </div>

                      <Modal
                        show={showAddnewServiceModal}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        centered={true}
                      >
                        <Modal.Body>
                          <div className="form-layout">
                            <h3>Add new service</h3>

                            <Form.Group>
                              <Form.Label>Service name</Form.Label>
                              <input className="form-control" type="text" />
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>Description</Form.Label>
                              <textarea className="form-control" rows={6} />
                            </Form.Group>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="dark">Add</Button>
                          <Button variant="outline-light" onClick={handleClose}>
                            Cancel
                          </Button>
                        </Modal.Footer>
                      </Modal>

                      <List
                        values={items}
                        onChange={({ oldIndex, newIndex }) =>
                          setItems(arrayMove(items, oldIndex, newIndex))
                        }
                        renderList={({ children, props }) => (
                          <div className="sort-wrapper" {...props}>
                            {children}
                          </div>
                        )}
                        renderItem={({ value, props }) => (
                          <div className="sort-item">
                            <EntityServiceItem
                              //itemId="1"
                              serviceTitle={"Wealth Management"}
                              service={
                                "Financial services offered within this segment include managing and investing customers&#39; wealth across various financial instruments- including debt, equity, mutual funds, insurance products, derivatives, structured products, commodities, and real estate, based on the clients&#39; financial goals, risk profile and time horizons. "
                              }
                            />
                          </div>
                        )}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="subscription">
                <EntitySubscription />
              </Tab.Pane>
              <Tab.Pane eventKey="checkout">
                <EntityCheckout />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </section>
    </PageTemplate>
  );
};

export default EditEntity;
