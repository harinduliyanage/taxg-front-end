import React, { useState } from "react";
import "./_reviews.scss";
import {
  Button,
  Form,
  Modal,

} from "react-bootstrap";
import axios from "axios";
import { ENTITY_KEY } from "../../../actions/keys";
import { EntityData } from "../../../interfaces/models/entity/EntityData";
import EntityServiceItem from "./EntityServiceItem";
import { useLocation } from "react-router-dom";
interface Props {
  data?: EntityData;
  setRerender?: any
}
const EntityServicList: React.FC<Props> = (props) => {
  const { data,setRerender } = props;
  const [showAddnewServiceModal, setShowAddnewServiceModal] = useState(false);
  const { state } = useLocation();
  const [serviceName, setServiceName] = useState("");
  const [serviceDes, setServiceDes] = useState("");

  const handleAddNewService = () => setShowAddnewServiceModal(true);
  const handleClose = () => {
    setShowAddnewServiceModal(false);
  };

  async function addNewService() {
    setShowAddnewServiceModal(false)
    const config = {
      Accept: "application/json",
      "x-api-key": ENTITY_KEY,
    };
    const data = {
        entityID: state.entityId,
        Services: [
            {
                status: 1,
                serviceID: 1,
                sortOrderNumber: 1,
                serviceName: serviceName,
                serviceDescription: serviceDes
            }
        ]
    }
      await axios
      .post(
        "https://etcp2if6be.execute-api.us-east-1.amazonaws.com/dev/EntityServices",
        data,
        {
          headers: config,
        }
      )
      .then((res: any) => {
        //console.log("addNewService",res.data);
        setRerender(false)
      })
      .catch((error: any) => {
        console.log(error);
      });
      
    }


  return (
    <div className="services-tab">
      <div className="section-header">
        <Button className="add-new" onClick={handleAddNewService}>
          <i className="fal fa-plus" /> Add new service
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
              <input className="form-control" type="text" onChange={(e) => setServiceName(e.target.value) }/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <textarea className="form-control" rows={6} onChange={(e) => setServiceDes(e.target.value) }/>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={addNewService}>Add</Button>
          <Button variant="outline-light" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="sort-wrapper">
        {data?.services ? data?.services.map((e, key: number) => (
          <div className="sort-item" key={key}>
            <EntityServiceItem
              itemId={e.serviceID}
              serviceTitle={e.serviceName}
              service={e.serviceDescription}
              setRerender={setRerender}
            />
          </div>
        ))
            : "No Records"
    }
      </div>
    </div>
  );
};

export default EntityServicList;
