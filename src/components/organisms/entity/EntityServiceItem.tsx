import React, { FC, useState } from "react";
import "./_service-item.scss";
import {  
    Button,
    Col,
    Form,
    Modal,
    Collapse,
    Row,
    } from "react-bootstrap";
import { ENTITY_KEY } from "../../../actions/keys";

import axios from "axios";
import { useLocation } from "react-router-dom";
interface EntityServiceProps {
    itemId?: number;
    serviceTitle?: string;
    service?: string;
    children?: JSX.Element | JSX.Element[];
    setRerender?: any
}



const EntityServiceItem: FC<EntityServiceProps> = ({ itemId, serviceTitle, service, setRerender}) => {
    const { state } = useLocation();
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [txtServiceTitle, settxtServiceTitle] = useState<string>();
    const [txtServiceName, settxtServiceName] = useState<string>();
    const removeService = (id: any) => {
      const config = {
        Accept: "application/json",
        "x-api-key": ENTITY_KEY,
      };
      const data = {
        entityID: state.entityId,
        Services: [
          {
            status: 3,
            serviceID: id,
            sortOrderNumber: 1,
            serviceName: serviceTitle,
            serviceDescription: service,
          },
        ],
      };
      axios
        .post(
          "https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/EntityServices",
          data,
          {
            headers: config,
          }
        )
        .then((res: any) => {
          console.log("removeService", res.data);
          setRerender(false);
          setIsOpen(false);
        })
        .catch((error: any) => {
          console.log(error);
        });
    };
   
    const updateService = (id: any) => {
      const config = {
        Accept: "application/json",
        "x-api-key": ENTITY_KEY,
      };
      const data = {
        entityID: state.entityId,
        Services: [
          {
            status: 2,
            serviceID: id,
            sortOrderNumber: 1,
            serviceName: txtServiceTitle ? txtServiceTitle : serviceTitle,
            serviceDescription: txtServiceName ? txtServiceName : service,
          },
        ],
      };
      axios
        .post(
          "https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/EntityServices",
          data,
          {
            headers: config,
          }
        )
        .then((res: any) => {
          console.log("updateService", res.data);
          setRerender(false);
          setOpen(false);
        })
        .catch((error: any) => {
          console.log(error);
        });
    };

    return (
      <div className="entry-service-item" key={itemId}>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="collapseService"
          aria-expanded={open}
          variant="link"
        >
          <span className="title">{serviceTitle}</span>
          <span className="dropdown-icon">
            <i className="fas fa-sort-down"></i>
          </span>
        </Button>
        <Collapse in={open}>
          <div className="service-item" id="collapseService">
            <Row>
              <Form.Group as={Col} controlId="">
                <Form.Label>Service name (key {itemId})</Form.Label>
                <input className={"form-control"} 
                defaultValue={serviceTitle} 
                onChange={(e) => settxtServiceTitle(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="">
                <Form.Label>Description</Form.Label>
                <textarea
                  className={"form-control"}
                  rows={6}
                  defaultValue={service}
                  onChange={(e) => settxtServiceName(e.target.value)}
                />
              </Form.Group>
            </Row>
            <div className="edit-row">
              <Button variant="dark" onClick={() => updateService(itemId)}>Save Changes</Button>
              <Button variant="outline-light" onClick={() => setOpen(!open)}>
                Cancel
              </Button>

              <Button
                variant="outline-danger"
                size="sm"
                className="ms-auto me-0"
                onClick={() =>  setIsOpen(true)}
              >
                Remove
              </Button>
            </div>
          </div>
        </Collapse>
        <Modal
          show={isOpen}
          //onHide={isOpen}
          backdrop="static"
          keyboard={false}
          centered={true}
        >
          <Modal.Body>
            <div className="form-layout">
              <h3>Are you sure?</h3>
              <p>You are about to remove a service and this action cannot be undone. Press cancel to go back.</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark error" onClick={() => removeService(itemId)}>
              Remove
            </Button>
            <Button variant="outline-light" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
};

EntityServiceItem.defaultProps = {

};

export default EntityServiceItem;
