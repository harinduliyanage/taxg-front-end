import { Row, Col, Button, Form, Modal, Accordion } from "react-bootstrap";
import { useEffect } from "react";
import "./_services.scss";
import { useState } from "react";
import { Auth } from "aws-amplify";
import { headerConfig } from "../../../actions/headers";
import { USER_DATA_API } from "../../../actions/endPoints";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import axios from "axios";

const ProfileServices = (props: any) => {
  const [enableEditButton, setEnableEditButton] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showEditButton, setShowEditButton] = useState(true);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showAddnewServiceModal, setShowAddnewServiceModal] = useState(false);
  const [showRemoveServiceModal, setShowRemoveServiceModal] = useState(false);

  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");

  const [selectId, setSelectId] = useState("");
  const [services, setServices] = useState<any>([]);

  const handleAddNewService = () => setShowAddnewServiceModal(true);

  function CustomToggle({children, eventKey, className }: any) {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
      <button
          className={className}
        type="button"
        onClick={()=>{
			UpdateService(selectId);
			decoratedOnClick(eventKey);
		}}
      >
        {children}
      </button>
    );
  }

  const handleClose = () => {
    setShowAddnewServiceModal(false);
    setShowRemoveServiceModal(false);
  };

  const handleSectionClose = () => {
    setEnableEditButton(false);
    // setShowEditButton(true);
  };

  // const hideEditButton = () => {
  //   setEnableEditButton(true);
  //   setShowEditButton(false);
  // };

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const config: any = await headerConfig();

    await axios
      .get(`${USER_DATA_API}/UserProfile/${attributes.sub}`, config)
      .then((res: any) => {
        setServices(res.data.results[0][0].services);
        console.log("data", res.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addServices = async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const uuid = attributes.sub;
    console.log("servicename", serviceName);
    console.log("description", description);

    const body = {
      uuid: uuid,
      services: [
        {
          status: 1,
          serviceID: null,
          sortOrderNumber: 1,
          serviceName: serviceName,
          serviceDes: description,
        },
      ],
    };

    const config: any = await headerConfig();

    axios
      .post(`${USER_DATA_API}/Services`, body, config)
      .then((res) => {
        getServices();
        setShowAddnewServiceModal(false);
        setDescription("");
        setServiceName("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeService = async (id: any) => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const uuid = attributes.sub;
    console.log("servicename", serviceName);
    console.log("description", description);

    const body = {
      uuid: uuid,
      services: [
        {
          status: 3,
          serviceID: id,
          sortOrderNumber: 1,
          serviceName: serviceName,
          serviceDes: description,
        },
      ],
    };

    const config: any = await headerConfig();

    axios
      .post(`${USER_DATA_API}/Services`, body, config)
      .then((res) => {
        getServices();
        setShowAddnewServiceModal(false);
        setDescription("");
        setServiceName("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const UpdateService = async (id: string) => {
    console.log("updated.");
    const { attributes } = await Auth.currentAuthenticatedUser();
    const uuid = attributes.sub;

    const body = {
      uuid: uuid,
      services: [
        {
          status: 2,
          serviceID: id,
          sortOrderNumber: 1,
          serviceName: serviceName,
          serviceDes: description,
        },
      ],
    };

    const config: any = await headerConfig();

    axios
      .post(`${USER_DATA_API}/Services`, body, config)
      .then((res) => {
        getServices();
        setShowAddnewServiceModal(false);
        setDescription("");
        setServiceName("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="services-tab">
      <div className="section-header">
        {/* {showEditButton && (
          <Button variant="outline-light" size="sm" onClick={hideEditButton}>
            <i className="fas fa-pencil" /> Edit
          </Button>
        )} */}
        {enableEditButton && (
          <Button className="add-new" onClick={handleAddNewService}>
            <i className="fal fa-plus" /> Add new service
          </Button>
        )}
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
              <input
                className="form-control"
                type="text"
                onChange={(e) => setServiceName(e.target.value)}
                value={serviceName}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <textarea
                className="form-control"
                rows={6}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={() => {
              addServices();
            }}
          >
            Add
          </Button>
          <Button variant="outline-light" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showRemoveServiceModal}>
        <Modal.Body>
          <h3>Are you sure?</h3>
          <p>
            You are about to remove a service and this action cannot be undone.
            Press cancel to go back.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              removeService(selectId);
              setShowRemoveServiceModal(false);
            }}
          >
            Remove
          </Button>
          <Button variant="outline-light" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Accordion
        defaultActiveKey="0"
        className={enableEditButton ? "sort-wrapper" : ""}
      >
        {services !== null ? (
          services.map((service: any) => {
            return (
              <>
                {!enableEditButton ? (
                  <Accordion.Item eventKey={service.id}>
                    <Accordion.Header
                      onClick={() => {
                        setServiceName(service.service_name);
                        console.log("service name :", serviceName);
                        setDescription(service.service_description);
                        console.log("service description :", description);
                      }}
                    >
                      {service.service_name}
                    </Accordion.Header>
                    <Accordion.Body>
                      {service.service_description}
                    </Accordion.Body>
                  </Accordion.Item>
                ) : (
                  <Accordion.Item className="sort-item" eventKey={service.id}>
                    <Accordion.Header
                      onClick={() => {
                        setServiceName(service.service_name);
                        setDescription(service.service_description);
						setSelectId(service.id);
                      }}
                    >
                      <Button variant="link">
                        <strong>{service.service_name}</strong>
                        <span className="dropdown-icon">
                          <i className="fas fa-sort-down"></i>
                        </span>
                      </Button>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="service-item">
                        <Row>
                          <Form.Group as={Col} controlId="">
                            <Form.Label>Service name</Form.Label>
                            <input
                              className={"form-control"}
                              defaultValue={service.service_name}
                              onChange={(e) => setServiceName(e.target.value)}
                            />
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group as={Col} controlId="">
                            <Form.Label>Description</Form.Label>
                            <textarea
                              className={"form-control"}
                              rows={6}
                              defaultValue={service.service_description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </Form.Group>
                        </Row>
                        <div className="edit-row">
                          <CustomToggle
                            eventKey="0"
                            className="btn btn-dark btn-sm"
                          >
                            Save Changes
                          </CustomToggle>
                          <CustomToggle className="btn btn-outline-light btn-sm" eventKey="0">Cancel</CustomToggle>

                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="ms-auto me-0"
                            onClick={() => {
                              setShowRemoveServiceModal(true);
                              setSelectId(service.id);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                )}
              </>
            );
          })
        ) : (
          <></>
        )}
      </Accordion>

      <div className="section-action">
        {enableEditButton && (
          <Button variant="outline-light" onClick={handleSectionClose}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileServices;
