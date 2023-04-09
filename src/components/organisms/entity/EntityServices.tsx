import Accordion from "react-bootstrap/Accordion";
import React from "react";
import "./_services.scss";
interface EntityServicesProps {
  servicesData? :Service []
}

type Service = {
  status: number
  serviceID: number
  sortOrderNumber: number
  serviceName: string
  serviceDescription: string
}

export const EntityServices: React.FC<EntityServicesProps> = (props) => {
  const { servicesData } = props;
  return (
    <>
      {servicesData ? servicesData?.map((e, key) => (
        <Accordion defaultActiveKey="0" key={key}>
          <Accordion.Item eventKey={key.toString()}>
            <Accordion.Header>{e.serviceName}</Accordion.Header>
            <Accordion.Body>{e.serviceDescription}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )): "No Records"}
    </>
  );
};

export default EntityServices;