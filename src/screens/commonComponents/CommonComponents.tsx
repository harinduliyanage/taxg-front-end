import React from "react";
import PageTemplate from "../templates/PageTemplate";

import {
  Accordion,
  Alert,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  Carousel,
  Container,
  Dropdown,
  Figure,
  ListGroup,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  InputGroup,
  FloatingLabel,
} from "react-bootstrap";
function CommonComponents() {
  return (
    <PageTemplate>
      <section className="text-left">
        <Container>
          <h1>Common Components</h1>
          <h3>for Tax Global</h3>
          <>
            {[
              "primary",
              "secondary",
              "success",
              "danger",
              "warning",
              "info",
              "light",
              "dark",
            ].map((variant) => (
              <Alert key={variant} variant={variant}>
                This is a {variant} alert—check it out!
              </Alert>
            ))}
          </>
          <Alert variant="success">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>
              Aww yeah, you successfully read this important alert message. This
              example text is going to run a bit longer so that you can see how
              spacing within an alert works with this kind of content.
            </p>
            <hr />
            <p className="mb-0">
              Whenever you need to, be sure to use margin utilities to keep
              things nice and tidy.
            </p>
          </Alert>
          <Alert variant="danger" dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              Change this and that and try again. Duis mollis, est non commodo
              luctus, nisi erat porttitor ligula, eget lacinia odio sem nec
              elit. Cras mattis consectetur purus sit amet fermentum.
            </p>
          </Alert>
          <Alert variant="success">
            <Alert.Heading>How's it going?!</Alert.Heading>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
              eget lacinia odio sem nec elit. Cras mattis consectetur purus sit
              amet fermentum.
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button variant="outline-success">Close me y'all!</Button>
            </div>
          </Alert>
          <h3>Form Components</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <>
              <Form.Label htmlFor="inputPassword5">Password</Form.Label>
              <Form.Control
                type="password"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
              />
              <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
              </Form.Text>
            </>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>

            <div key={`default-checkbox`} className="mb-3">
              <Form.Check
                type="checkbox"
                id={`default-checkbox`}
                label={`default checkbox`}
              />

              <Form.Check
                disabled
                type="checkbox"
                label={`disabled checkbox`}
                id={`disabled-default-checkbox`}
              />
            </div>

            <div key={`default-radio`} className="mb-3">
              <Form.Check
                type="radio"
                id={`default-radio`}
                label={`default radio`}
              />

              <Form.Check
                disabled
                type="radio"
                label={`disabled radio`}
                id={`disabled-default-radio`}
              />
            </div>

            <Form.Check
              type="switch"
              id="custom-switch"
              label="Check this switch"
            />
            <Form.Check
              disabled
              type="switch"
              label="disabled switch"
              id="disabled-custom-switch"
            />
            <>
              <Form.Label>Range</Form.Label>
              <Form.Range />
            </>
            <>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Text id="basic-addon2">
                  @example.com
                </InputGroup.Text>
              </InputGroup>

              <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon3">
                  https://example.com/users/
                </InputGroup.Text>
                <Form.Control id="basic-url" aria-describedby="basic-addon3" />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control aria-label="Amount (to the nearest dollar)" />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>

              <InputGroup>
                <InputGroup.Text>With textarea</InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" />
              </InputGroup>
            </>

            <>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Small
                </InputGroup.Text>
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </InputGroup>
              <br />
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Default
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
              <br />
              <InputGroup size="lg">
                <InputGroup.Text id="inputGroup-sizing-lg">
                  Large
                </InputGroup.Text>
                <Form.Control
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </InputGroup>
            </>
            <InputGroup className="mb-3">
              <InputGroup.Text>First and last name</InputGroup.Text>
              <Form.Control aria-label="First name" />
              <Form.Control aria-label="Last name" />
            </InputGroup>
            <>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
            </>
            <>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Comments"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingTextarea2" label="Comments">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
            </>
          </Form>
          <h3>Accordian</h3>

          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Accordion Item #1</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <h3>Heading</h3>
          <div>
            <h1>
              Example heading <Badge bg="secondary">New</Badge>
            </h1>
            <h2>
              Example heading <Badge bg="secondary">New</Badge>
            </h2>
            <h3>
              Example heading <Badge bg="secondary">New</Badge>
            </h3>
            <h4>
              Example heading <Badge bg="secondary">New</Badge>
            </h4>
            <h5>
              Example heading <Badge bg="secondary">New</Badge>
            </h5>
            <h6>
              Example heading <Badge bg="secondary">New</Badge>
            </h6>
            <Button variant="primary">
              Profile <Badge bg="secondary">9</Badge>
              <span className="visually-hidden">unread messages</span>
            </Button>
          </div>
          <h3>Badges</h3>
          <div>
            <Badge bg="primary">Primary</Badge>{" "}
            <Badge bg="secondary">Secondary</Badge>{" "}
            <Badge bg="success">Success</Badge>{" "}
            <Badge bg="danger">Danger</Badge>{" "}
            <Badge bg="warning" text="dark">
              Warning
            </Badge>{" "}
            <Badge bg="info">Info</Badge>{" "}
            <Badge bg="light" text="dark">
              Light
            </Badge>{" "}
            <Badge bg="dark">Dark</Badge>
          </div>
          <div>
            <Badge pill bg="primary">
              Primary
            </Badge>{" "}
            <Badge pill bg="secondary">
              Secondary
            </Badge>{" "}
            <Badge pill bg="success">
              Success
            </Badge>{" "}
            <Badge pill bg="danger">
              Danger
            </Badge>{" "}
            <Badge pill bg="warning" text="dark">
              Warning
            </Badge>{" "}
            <Badge pill bg="info">
              Info
            </Badge>{" "}
            <Badge pill bg="light" text="dark">
              Light
            </Badge>{" "}
            <Badge pill bg="dark">
              Dark
            </Badge>
          </div>
          <h3>Breadcrumbs</h3>

          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
              Library
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
          </Breadcrumb>
          <h3>Buttons</h3>
          <>
            <Button variant="primary">Primary</Button>{" "}
            <Button variant="secondary">Secondary</Button>{" "}
            <Button variant="success">Success</Button>{" "}
            <Button variant="warning">Warning</Button>{" "}
            <Button variant="danger">Danger</Button>{" "}
            <Button variant="info">Info</Button>{" "}
            <Button variant="light">Light</Button>{" "}
            <Button variant="dark">Dark</Button>{" "}
            <Button variant="link">Link</Button>
            <Button variant="outline-primary">Primary</Button>{" "}
            <Button variant="outline-secondary">Secondary</Button>{" "}
            <Button variant="outline-success">Success</Button>{" "}
            <Button variant="outline-warning">Warning</Button>{" "}
            <Button variant="outline-danger">Danger</Button>{" "}
            <Button variant="outline-info">Info</Button>{" "}
            <Button variant="outline-light">Light</Button>{" "}
            <Button variant="outline-dark">Dark</Button>
            <Button href="#">Link</Button> <Button type="submit">Button</Button>{" "}
            <Button as="input" type="button" value="Input" />{" "}
            <Button as="input" type="submit" value="Submit" />{" "}
            <Button as="input" type="reset" value="Reset" />
            <Button variant="primary" size="lg">
              Block level button
            </Button>
            <Button variant="secondary" size="lg">
              Block level button
            </Button>
            <div className="mb-2">
              <Button variant="primary" size="lg">
                Large button
              </Button>{" "}
              <Button variant="secondary" size="lg">
                Large button
              </Button>
            </div>
            <div>
              <Button variant="primary" size="sm">
                Small button
              </Button>{" "}
              <Button variant="secondary" size="sm">
                Small button
              </Button>
            </div>
            <>
              <Button variant="primary" size="lg" active>
                Primary button
              </Button>{" "}
              <Button variant="secondary" size="lg" active>
                Button
              </Button>
            </>
            <ButtonGroup aria-label="Basic example">
              <Button variant="secondary">Left</Button>
              <Button variant="secondary">Middle</Button>
              <Button variant="secondary">Right</Button>
            </ButtonGroup>
          </>
          <h3>Cards</h3>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>This is some text within a card body.</Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Card Subtitle
              </Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
          <h3>List Group</h3>
          <Card style={{ width: "18rem" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
          <h3>Carousel</h3>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="holder.js/800x400?text=First slide&bg=373940"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="holder.js/800x400?text=Second slide&bg=282c34"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="holder.js/800x400?text=Third slide&bg=20232a"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <h3>Dropdowns</h3>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <h3>Figure</h3>
          <Figure>
            <Figure.Image
              width={171}
              height={180}
              alt="171x180"
              src="holder.js/171x180"
            />
            <Figure.Caption>
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </Figure.Caption>
          </Figure>
          <h3>ListGroup</h3>
          <ListGroup>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
          <h3>Modal</h3>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary">Close</Button>
              <Button variant="primary">Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
      </section>
    </PageTemplate>
  );
}

export default CommonComponents;
